import { useState, useRef, useContext } from 'react';
import {api} from '../index';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// import redPin from '../img/redPin.png';
import greenPin from '../img/greenPin.png';
import lightGreenPin from '../img/lightGreenPin.png';
import purplePin from '../img/purplePin.png';
import yellowPin from '../img/yellowPin.png';
import grayPin from '../img/grayPin.png';
import selectedPinDPT from '../img/selectedPinDPT.png';
import selectedPinFCE from '../img/selectedPinFCE.png';

import TherapistDetails from '../details/TherapistDetails';

import { useParams } from 'react-router-dom';

import useGetReferral from '../hooks/useGetReferral';
import useGetTherapistsSearchAll from '../hooks/useGetTherapistsSearchAll';
import useUpdateReferral from '../hooks/useUpdateReferral';

import { DetailsContext } from '../contexts/DetailsContext';

import { bbox, point, circle } from '@turf/turf';

import '../App.css';

import Map, {NavigationControl, Marker, Popup, Source, Layer} from 'react-map-gl';

import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default; /* eslint import/no-webpack-loader-syntax: off */


// // // // // // // //

const circleLayer = {
    "id": "polygon",
    "type": "fill",
    "source": "polygon",
    "layout": {},
    "paint": {
        "fill-color": "blue",
        "fill-opacity": 0.1
    }
};

const createGeoJSONCircle = function(center, radiusInKm, points) {
    if(!points) points = 64;

    var coords = {
        latitude: center[1],
        longitude: center[0]
    };

    var km = radiusInKm;

    var ret = [];
    var distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
    var distanceY = km/110.574;

    var theta, x, y;
    for(var i=0; i<points; i++) {
        theta = (i/points)*(2*Math.PI);
        x = distanceX*Math.cos(theta);
        y = distanceY*Math.sin(theta);

        ret.push([coords.longitude+x, coords.latitude+y]);
    }
    ret.push(ret[0]);

    return {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "Polygon",
                "coordinates": [ret]
            }
        }]
    };
};



export default function MapTab(props) {

    const LAT = 38.88;
    const LON = -96;
    const ZOOM = 3.3;
    const TOKEN = "pk.eyJ1Ijoid29ja3lnIiwiYSI6ImNsbjk0amFjNTAzdXUybG56aGY4MW51OWgifQ.FHahp8Od7BRwsArJfP0YHw";
    const MAPSTYLE = "mapbox://styles/mapbox/streets-v12";

    const mapRef = useRef();

    let { id: linkId } = useParams();

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    const { status: statusTherapists, data: therapists, error: errorTherapists, isFetching: isFetchingTherapists } = useGetTherapistsSearchAll();

    const { currentlyEditingSearch: currentlyEditing, setCurrentlyEditingSearch: setCurrentlyEditing } = useContext(DetailsContext);

    const therapistsFiltered = therapists?.filter(t => t.lat && t.lon);

    const therapistsFilteredDPT = therapistsFiltered?.filter(t => t.dptAgreementStatus === 'Agreed');
    const therapistsFilteredFCEPPD = therapistsFiltered?.filter(t => t.fceAgreementStatus === 'Agreed');
    const therapistsFilteredWCWH = therapistsFiltered?.filter(t => t.wcwhAgreementStatus === 'Agreed');

    const [selectedFilter, setSelectedFilter] = useState(selectedClaim?.serviceGeneral === 'DPT' ? 'dpt' : (selectedClaim?.serviceGeneral === 'FCE' ? 'fceppd' : null));
    const [filteredPins, setFilteredPins] = useState(selectedClaim?.serviceGeneral === 'DPT' ? therapistsFilteredDPT : (selectedClaim?.serviceGeneral === 'FCE' ? therapistsFilteredFCEPPD : null));
    const [useIWChecked, setUseIWChecked] = useState(false);

    const [popupInfo, setPopupInfo] = useState(null);
    const [searchVal, setSearchVal] = useState('');
    const [searchLat, setSearchLat] = useState();
    const [searchLon, setSearchLon] = useState();
    const [circleSource, setCircleSource] = useState();
    const [circleRadius, setCircleRadius] = useState(selectedClaim?.serviceGeneral === 'DPT' ? 16.09 : 80.47);
    const [circleZoom, setCircleZoom] = useState(selectedClaim?.serviceGeneral === 'DPT' ? 10.0 : 7.5);
    const [viewport, setViewport] = useState({
        longitude: LON,
        latitude: LAT,
        zoom: ZOOM,
        maxZoom: 15,
        minZoom: ZOOM,
        // dragPan: this.zoom >  false,
        // scrollZoom: false,
        // doubleClickZoom: false,
        boxZoom: false,
    });

    // const [selectedFilterIW, setSelectedFilterIW] = useState();

    // console.log(useIWChecked);

    // console.log(therapistsFiltered2?.length);

    // therapists && console.log(therapists);

    // const dpt = therapists?.filter(r => r.dptAgreementStatus === 'Agreed');
    // const dptEvents = dptReferrals?.map(r => ({title: `${r.claimant} ${r.apptTime}`, date: r.apptDate, textColor: '#17202A', referralId: r.referralId}));

    // const fce = therapists?.filter(r => r.fceAgreementStatus === 'Agreed');
    // const fceEvents = fceReferrals?.map(r => ({title: `${r.claimant} ${r.apptTime}`, date: r.apptDate, backgroundColor: '#A569BD', referralId: r.referralId}));

    // const wcwh = therapists?.filter(r => r.wcwhAgreementStatus === 'Agreed');

    const updateReferral = useUpdateReferral();

    const handleSelectedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setSelectedFilter(newFilter);
            if (newFilter === 'dpt'){
                setFilteredPins(therapistsFilteredDPT);
            }
            else if (newFilter === 'fceppd') {
                setFilteredPins(therapistsFilteredFCEPPD);
            }
            else if (newFilter === 'wcwh') {
                setFilteredPins(therapistsFilteredWCWH);
            }
            else if (newFilter === 'all') {
                setFilteredPins(therapistsFiltered);
            }
        }
    };

    const handleRadius = (event, newRadius) => {
        if (newRadius !== null){
            // const radiusKm = newRadius * 1.609344;
            console.log(newRadius);
            setCircleRadius(newRadius);
            setCircleSource(createGeoJSONCircle([searchLon, searchLat], newRadius));
            if (newRadius === 16.09) {
                setCircleZoom(10.0);
                searchLat && searchLon && mapRef.current.flyTo({center: [searchLon, searchLat], zoom: 10.0});
            }
            else if (newRadius === 32.18) {
                setCircleZoom(9.0);
                searchLat && searchLon && mapRef.current.flyTo({center: [searchLon, searchLat], zoom: 9.0});
            }
            else if (newRadius === 48.28) {
                setCircleZoom(8.3);
                searchLat && searchLon && mapRef.current.flyTo({center: [searchLon, searchLat], zoom: 8.3});
            }
            else if (newRadius === 64.37) {
                setCircleZoom(7.8);
                searchLat && searchLon && mapRef.current.flyTo({center: [searchLon, searchLat], zoom: 7.8});
            }
            else if (newRadius === 80.47) {
                setCircleZoom(7.5);
                searchLat && searchLon && mapRef.current.flyTo({center: [searchLon, searchLat], zoom: 7.6});
            }
            
        }
    };

    // const handleSelectedFilterIW = (event, newFilter) => {
    //     if (newFilter !== null){
    //         setSelectedFilterIW(newFilter);
    //     }
    // };

    const handleChangeUseIWChecked = (event) => {
        setUseIWChecked(event.target.checked);
        if (event.target.checked) {
            setSearchVal(`${selectedClaim.claimantAddress} ${selectedClaim.claimantCity}, ${selectedClaim.claimantState} ${selectedClaim.claimantZip}`);
        }
        else {
            setSearchVal('');
        }
    };

    const handleChangeSearch = (event) => {
        setSearchVal(event.target.value);        
    };

    const handleScheduleHere = (event) => {
        updateReferral.mutate({referralId: selectedClaim.referralId, therapistId: popupInfo.therapistId});
    };

    const handleClickPin = (event, row) => {
        console.log("Pin click", row);
        event.originalEvent.stopPropagation();
        setPopupInfo(row);
    };

    const handleClickSearch = (event) => {
        console.log("Search:", searchVal);
        selectedClaim?.serviceGeneral === 'DPT' && setSelectedFilter('dpt');
        selectedClaim?.serviceGeneral === 'DPT' && setFilteredPins(therapistsFilteredDPT);
        selectedClaim?.serviceGeneral === 'FCE' && setSelectedFilter('fceppd');
        selectedClaim?.serviceGeneral === 'FCE' && setFilteredPins(therapistsFilteredFCEPPD)
        
        api.get(`/map/fromAddress/${searchVal}`)
            .then(response => {
    
            const data = response.data;
            const {lat, lon} = data;
            console.log("Center:", lat, lon);
            setSearchLat(lat);
            setSearchLon(lon);
            // const feature = point([lat, lon]);
            // const [minLng, minLat, maxLng, maxLat] = bbox(feature);
            // console.log("Box:", minLng, minLat, maxLng, maxLat);
            mapRef.current.flyTo({center: [lon, lat], zoom: circleZoom});
            setCircleSource(createGeoJSONCircle([lon, lat], circleRadius));
            console.log(circleRadius);

            });
    };

    const handleClearSearch = (event) => {
        setSearchVal('');
        setSearchLat(null);
        setSearchLon(null);
        setUseIWChecked(false);
        setFilteredPins([]);
        setSelectedFilter(null);
        setPopupInfo(null);
        mapRef.current.flyTo({center: [LON, LAT], zoom: ZOOM});
        setCircleSource(null);
    };

    return(

        <Box sx={{ width: '100%', height: 500 }}>
        {/* <Container fluid style={{background: '#FFFFFF'}}> */}
            <Grid container spacing={2}>
                <Grid item xs={2.3}>
                    <Box sx={{ background: '#99A3A4', width: '100%', height: 500 }}>
                        <Grid container sx={{paddingTop: 2}}>
                            
                            {/* service toggle */}
                            <Grid item xs={12} sx={{paddingTop: 2}}>
                                <ToggleButtonGroup
                                size="small"
                                value={selectedFilter}
                                exclusive
                                onChange={handleSelectedFilter}
                                aria-label="text alignment"
                                >
                                    <ToggleButton
                                    value="dpt"
                                    aria-label="dpt"
                                    // disabled={(useIWChecked && !selectedClaim?.service.includes('DPT')) ? true : false}
                                    >
                                        DPT
                                    </ToggleButton>
                                    <ToggleButton
                                    value="fceppd"
                                    aria-label="fceppd"
                                    // disabled={(useIWChecked && !selectedClaim?.service.includes('FCE') && selectedClaim?.service.includes('PPD')) ? true : false}
                                    >
                                        FCE|PPD
                                    </ToggleButton>
                                    <ToggleButton 
                                    value="wcwh" 
                                    aria-label="wcwh"
                                    // disabled={(useIWChecked && !selectedClaim?.service.includes('WC') && selectedClaim?.service.includes('WH')) ? true : false}
                                    >
                                        WC|WH
                                    </ToggleButton>
                                    <ToggleButton value="all" aria-label="all">
                                        ALL
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Box width='100%' />
                            {/* radius toggle */}
                            <Grid item xs={12} sx={{paddingTop: 2}}>
                                <ToggleButtonGroup
                                size="small"
                                value={circleRadius}
                                exclusive
                                onChange={handleRadius}
                                aria-label="radius length"
                                >
                                    <ToggleButton
                                    value={16.09}
                                    aria-label="10mi"
                                    // disabled={(useIWChecked && !selectedClaim?.service.includes('DPT')) ? true : false}
                                    >
                                        10 mi
                                    </ToggleButton>
                                    <ToggleButton
                                    value={32.18}
                                    aria-label="20mi"
                                    // disabled={(useIWChecked && !selectedClaim?.service.includes('FCE') && selectedClaim?.service.includes('PPD')) ? true : false}
                                    >
                                        20 mi
                                    </ToggleButton>
                                    <ToggleButton 
                                    value={48.28}
                                    aria-label="30mi"
                                    // disabled={(useIWChecked && !selectedClaim?.service.includes('WC') && selectedClaim?.service.includes('WH')) ? true : false}
                                    >
                                        30 mi
                                    </ToggleButton>
                                    <ToggleButton 
                                    value={64.37} 
                                    aria-label="40mi">
                                        40 mi
                                    </ToggleButton>
                                    <ToggleButton 
                                    value={80.47} 
                                    aria-label="50mi">
                                        50 mi
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Box width='100%' />
                            <br />
                            {selectedClaim && selectedClaim.claimantAddress && selectedClaim.claimantCity && selectedClaim.claimantState && selectedClaim.claimantZip &&
                            <>
                            {/* IW address checkbox */}
                            <Grid item xs={12}>
                                <FormControlLabel
                                // sx={{fontSize: 10}}
                                control={<Checkbox checked={useIWChecked} onChange={handleChangeUseIWChecked} />}
                                label="Use selected IW's Address" />
                            </Grid>
                            <Box width='100%' />
                            </>
                            }
                            {/* search bar */}
                            <Grid item xs={12}>
                                <Grid container spacing={1} sx={{paddingLeft: 2}}>
                                    <Grid item>
                                        <TextField 
                                        size="small"
                                        // type='text'
                                        id="searchVal"
                                        name="searchVal"
                                        label="Search"
                                        variant="outlined"
                                        value={searchVal}
                                        onChange={(e) => handleChangeSearch(e)}
                                        sx={{borderRadius: 1, background: '#FFFFFF'}}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" sx={{paddingLeft: 0, paddingRight: 0, width: 30}} onClick={(e) => handleClickSearch(e)}>
                                            <SearchIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Box width='100%' />
                            
                        </Grid>
                        <hr />
                        <Grid item>
                            <Button
                            onClick={handleClearSearch}
                            variant="contained"
                            >
                                Clear Search
                            </Button>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={5.7}>
                   <Map
                    ref={mapRef}
                    mapboxAccessToken={TOKEN}
                    initialViewState={viewport}
                    style={{width: 800, height: 500}}
                    mapStyle={MAPSTYLE}
                    >
                        <NavigationControl />

                        {circleSource &&
                        <Source id="polygon" type="geojson" data={circleSource}>
                            <Layer {...circleLayer} />
                        </Source>
                        }

                        {searchLat && searchLon &&
                        <Marker
                        longitude={searchLon}
                        latitude={searchLat}
                        anchor="bottom"
                        >
                            
                        </Marker>
                        }

                        {therapists && filteredPins && filteredPins.map((row, i) => {
                            return (
                                <Marker
                                key={i}
                                longitude={row.lon} 
                                latitude={row.lat} 
                                anchor="bottom"
                                onClick={e => handleClickPin(e, row)}
                                style={{cursor: 'pointer'}}
                                >
                                    {(selectedClaim && row.therapistId === selectedClaim?.therapistId)
                                    ?
                                    <img src={selectedClaim.serviceGeneral === 'DPT' ? selectedPinDPT : (selectedClaim.serviceGeneral === 'FCE' ? selectedPinFCE : grayPin)} alt="pin" width={25} />
                                    :
                                    <img src={selectedFilter === 'dpt' ? greenPin : (selectedFilter === 'fceppd' ? purplePin : (selectedFilter === 'wcwh' ? yellowPin : grayPin))} alt="pin" width={25} />
                                    }
                                </Marker>
                            );
                        })}
                        {popupInfo &&
                            <Popup
                                anchor="top"
                                longitude={Number(popupInfo.lon)}
                                latitude={Number(popupInfo.lat)}
                                onClose={() => setPopupInfo(null)}
                            >
                                <div>
                                {popupInfo.name}
                                </div>
                                {selectedClaim && (selectedClaim.referralStatus === 'Open' || selectedClaim.referralStatus === 'Reschedule') && 
                                <div>
                                {selectedClaim.therapistId !== popupInfo.therapistId 
                                ?
                                <>
                                <button onClick={handleScheduleHere}>Schedule Here</button>
                                {selectedClaim.therapistId &&
                                <>
                                <br />
                                {`Currently scheduled at:` }
                                <br />
                                {`${selectedClaim.therapist}` }
                                </>
                                }
                                </>
                                :
                                'Scheduled Here'
                                }
                                </div>
                                
                                }
                            </Popup>
                        }
                    </Map>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ background: '#99A3A4', width: '100%', height: 500 }}>
                        {popupInfo &&
                        <TherapistDetails
                        detailsId={popupInfo?.therapistId}
                        currentlyEditing={currentlyEditing}
                        setCurrentlyEditing={setCurrentlyEditing}
                        searchBox={true}
                        />
                        }
                    </Box>
                </Grid>
            </Grid>

        {/* </Container> */}
        </Box>
    );
}