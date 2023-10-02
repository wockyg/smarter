import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import useGetReferralsCalendar from '../hooks/useGetReferralsCalendar';

import { useNavigate } from "react-router-dom";

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';

import ReferralsByCC from './ReferralsByCC';
import ReferralsByState from './ReferralsByState';
import ReferralsByMonth from './ReferralsByMonth';

import '../App.css';

import { ref } from 'yup';

export default function ReportsTab(props) {

    const { status: statusRows, data: referrals, error: errorRows, isFetching: isFetchingRows } = useGetReferralsCalendar();

    // const navigate = useNavigate();

    // referrals && console.log(referrals);

    const filteredReferrals = referrals?.filter(r => r.service.includes('DPT') && (r.referralStatus === 'Open' || r.ptStatus === 'Active'));
    const dptEvents = filteredReferrals?.map(r => ({title: `${r.claimant} ${r.apptTime}`, date: r.apptDate, textColor: '#17202A', referralId: r.referralId}))

    const referralEvents = referrals?.map(r => ({title: `${r.claimant} ${r.service}`, date: r.referralDate, textColor: '#17202A', referralId: r.referralId}))

    // referrals && console.log(dptEvents);

    const fceReferrals = referrals?.filter(r => (r.service.includes('FCE') || r.service.includes('PPD')) && r.referralStatus === 'Complete');
    const fceEvents = fceReferrals?.map(r => ({title: `${r.claimant} ${r.apptTime}`, date: r.apptDate, backgroundColor: '#A569BD', referralId: r.referralId}))

    const [selectedFilter, setSelectedFilter] = useState("dpt");
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

    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    });

    return(
        <Box sx={{ width: '100%', height: 600 }}>
        <ToggleButtonGroup
        size="small"
        value={selectedFilter}
        exclusive
        onChange={handleSelectedFilter}
        aria-label="text alignment"
        >
            <ToggleButton value="cc" aria-label="cc">
                Referrals By CC
            </ToggleButton>
            <ToggleButton value="referrals" aria-label="referrals">
                Referral Count
            </ToggleButton>
            <ToggleButton value="qr" aria-label="qr">
                Quarterly Reports
            </ToggleButton>
        </ToggleButtonGroup>
        
        {selectedFilter === 'cc' &&
        <></>
        }
        {selectedFilter === 'referrals' &&
        // <ReferralCount />
        <></>
        }
        {selectedFilter === 'qr' &&
        // <QuarterlyReports />
        <></>
        }

        <Container style={{background: '#FFFFFF', height: 500, width: '100%'}}>
            <Grid container spacing={2}>
                <Grid item>
                    <ReferralsByCC />
                </Grid>
                <Grid item>
                    <ReferralsByState />
                </Grid>
                <Grid item>
                    <ReferralsByMonth />
                </Grid>
                <Box width="100%"/>
            </Grid>
            
        
        </Container>
        </Box>
    );
}