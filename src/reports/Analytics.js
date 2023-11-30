import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material';

import useGetReferralsCalendar from '../hooks/useGetReferralsCalendar';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';

import ReferralsByCC from './ReferralsByCC';
import ReferralsByState from './ReferralsByState';
import ReferralsByMonthPivot from './ReferralsByMonthPivot';
import ReferralsByMonthLineChart from './ReferralsByMonthLineChart';

import '../App.css';

export default function Analytics(props) {

    const { status: statusRows, data: referrals, error: errorRows, isFetching: isFetchingRows } = useGetReferralsCalendar();

    // const navigate = useNavigate();

    // referrals && console.log(referrals);

    const filteredReferrals = referrals?.filter(r => r.service.includes('DPT') && (r.referralStatus === 'Open' || r.ptStatus === 'Active'));
    const dptEvents = filteredReferrals?.map(r => ({title: `${r.claimant} ${r.apptTime}`, date: r.apptDate, textColor: '#17202A', referralId: r.referralId}))

    const referralEvents = referrals?.map(r => ({title: `${r.claimant} ${r.service}`, date: r.referralDate, textColor: '#17202A', referralId: r.referralId}))

    // referrals && console.log(dptEvents);

    const fceReferrals = referrals?.filter(r => (r.service.includes('FCE') || r.service.includes('PPD')) && r.referralStatus === 'Complete');
    const fceEvents = fceReferrals?.map(r => ({title: `${r.claimant} ${r.apptTime}`, date: r.apptDate, backgroundColor: '#A569BD', referralId: r.referralId}))

    const [selectedFilter, setSelectedFilter] = useState("analytics");
    const [events, setEvents] = useState([]);

    const handleSelectedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setSelectedFilter(newFilter);
        }
    };

    const handleEventClick = (event) => {
        console.log("Event click");
        const newId = event.event._def.extendedProps.referralId;
        console.log(newId);
        // navigate(`/${newId}`);
    };

    return( selectedFilter === 'analytics' &&

        <Box style={{background: '#FF2F4F', height: 550, width: '100%'}}>
            <Grid container spacing={2}>
                <Grid item>
                    <ReferralsByMonthLineChart />
                </Grid>
                <Box width="100%"/>
                {/* <Grid item>
                    <ReferralsByMonthPivot />
                </Grid>
                <Grid item>
                    <ReferralsByState />
                </Grid>
                <Grid item>
                    
                </Grid> */}
            </Grid>
        </Box>
    );
}