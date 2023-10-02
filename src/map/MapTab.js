import { useState, useRef } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
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

import { useParams } from 'react-router-dom';

import Map, {NavigationControl, Marker, Popup} from 'react-map-gl';

import {setDefaults, fromAddress, geocode, RequestType} from "react-geocode";

import useGetReferral from '../hooks/useGetReferral';
import useGetTherapistsSearchAll from '../hooks/useGetTherapistsSearchAll';
import useUpdateReferral from '../hooks/useUpdateReferral';

import { bbox, point } from '@turf/turf';

import '../App.css';

export default function MapTab(props) {

    const LAT = 38.88;
    const LON = -96;
    const ZOOM = 3.3;
    const TOKEN = "pk.eyJ1Ijoid29ja3lnIiwiYSI6ImNsYmlkdTFkeTB6MTczdm1waGw5ODFqNmYifQ.z1PaPArkNWOe40Bd8EVU3A";
    const MAPSTYLE = "mapbox://styles/wockyg/clmur28fx021g01rca7s37o5j";

    const mapRef = useRef();

    const [popupInfo, setPopupInfo] = useState(null);
    const [searchVal, setSearchVal] = useState('');
    const [searchLat, setSearchLat] = useState();
    const [searchLon, setSearchLon] = useState();
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

    setDefaults({
    key: "AIzaSyCQNOZwCnZCsvWFGwPGVslj95iZiDy0FvU",
    language: "en",
    region: "es",
    });

    let { id: linkId } = useParams();

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    const { status: statusTherapists, data: therapists, error: errorTherapists, isFetching: isFetchingTherapists } = useGetTherapistsSearchAll();

    const therapistsFiltered = therapists?.filter(t => t.lat && t.lon);

    const therapistsFilteredDPT = therapistsFiltered?.filter(t => t.dptAgreementStatus === 'Agreed');
    const therapistsFilteredFCEPPD = therapistsFiltered?.filter(t => t.fceAgreementStatus === 'Agreed');
    const therapistsFilteredWCWH = therapistsFiltered?.filter(t => t.wcwhAgreementStatus === 'Agreed');

    const [selectedFilter, setSelectedFilter] = useState();
    const [filteredPins, setFilteredPins] = useState();
    const [useIWChecked, setUseIWChecked] = useState(false);

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
        console.log("Pin click");
        event.originalEvent.stopPropagation();
        setPopupInfo(row);
    };

    const handleClickSearch = (event) => {
        console.log("Search:", searchVal);
        fromAddress(searchVal)
        .then(({ results }) => {
            const { lat, lng } = results[0].geometry.location;
            console.log("Center:", lat, lng);
            setSearchLat(lat);
            setSearchLon(lng);
            // const feature = point([lat, lng]);
            // const [minLng, minLat, maxLng, maxLat] = bbox(feature);
            // console.log("Box:", minLng, minLat, maxLng, maxLat);
            mapRef.current.flyTo({center: [lng, lat], zoom: 13});

        })
        .catch(console.error);
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
    };

    return(
        <Box sx={{ width: '100%', height: 500 }}>
        {/* <Container fluid style={{background: '#FFFFFF'}}> */}
            <Grid container spacing={2}>
                <Grid item xs={2.3}>
                    <Box sx={{ background: '#99A3A4', width: '100%', height: 500 }}>
                        <Grid container sx={{paddingTop: 2}}>
                            {selectedClaim && selectedClaim.claimantAddress && selectedClaim.claimantCity && selectedClaim.claimantState && selectedClaim.claimantZip &&
                            <>
                            <Grid item xs={12}>
                                <FormControlLabel
                                // sx={{fontSize: 10}}
                                control={<Checkbox checked={useIWChecked} onChange={handleChangeUseIWChecked} />}
                                label="Use selected IW's Demographics" />
                            </Grid>
                            <Box width='100%' />
                            {/* {useIWChecked &&
                            <Grid item xs={12} sx={{paddingTop: 0.5}}>
                                <ToggleButtonGroup
                                size="small"
                                value={selectedFilterIW}
                                exclusive
                                onChange={handleSelectedFilterIW}
                                aria-label="text alignment"
                                >
                                    <ToggleButton value="home" aria-label="home">
                                        Home
                                    </ToggleButton>
                                    <ToggleButton value="employer" aria-label="employer">
                                        Employer
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            } */}
                            </>
                            }
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

                        {searchLat && searchLon &&
                        <Marker
                        longitude={searchLon}
                        latitude={searchLat}
                        anchor="bottom"
                        >
                            
                        </Marker>
                        }

                        {therapists && filteredPins?.map((row, i) => {
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

                    </Box>
                </Grid>
            </Grid>

        {/* </Container> */}
        </Box>
    );
}