import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { deepOrange, deepPurple } from '@mui/material/colors';

import PTOCalendar from './PTOCalendar';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import useGetReferralsCalendar from '../hooks/useGetReferralsCalendar';
import useGetUsers from '../hooks/useGetUsers';

import { useNavigate } from "react-router-dom";

import '../App.css';

import { ref } from 'yup';

export default function CalendarTab(props) {

    const fakeDaysOff = [2,10,9,4,0,5,11,7,4,5,6,3,6,4,11]

    const { status: statusRows, data: referrals, error: errorRows, isFetching: isFetchingRows } = useGetReferralsCalendar();
    const { status: statusUsers, data: users, error: errorUsers, isFetching: isFetchingUsers } = useGetUsers();

    const navigate = useNavigate();

    // referrals && console.log(referrals);

    const dptReferrals = referrals?.filter(r => r.service.includes('DPT') && r.referralStatus === 'Complete');
    const dptEvents = dptReferrals?.map(r => ({title: `${r.assign} ${r.claimant} ${r.apptTime}`, date: r.apptDate, textColor: '#17202A', referralId: r.referralId}))

    const referralEvents = referrals?.map(r => ({title: `${r.assign} ${r.claimant} ${r.service}`, date: r.referralDate, textColor: '#17202A', referralId: r.referralId}))

    // referrals && console.log(dptEvents);

    const fceReferrals = referrals?.filter(r => (r.service.includes('FCE') || r.service.includes('PPD')) && r.referralStatus === 'Complete');
    const fceEvents = fceReferrals?.map(r => ({title: `${r.assign} ${r.claimant} ${r.apptTime}`, date: r.apptDate, backgroundColor: '#A569BD', referralId: r.referralId}))

    const [selectedFilter, setSelectedFilter] = useState("dpt");
    const [events, setEvents] = useState([]);

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSelectedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setSelectedFilter(newFilter);
        }
    };

    const handleEventClick = (event) => {
        console.log("Event click");
        const newId = event.event._def.extendedProps.referralId;
        console.log(newId);
        navigate(`/${newId}`);
    };

    return(
        <Box sx={{ width: '100%', height: 650 }}>
        <ToggleButtonGroup
        size="small"
        value={selectedFilter}
        exclusive
        onChange={handleSelectedFilter}
        aria-label="text alignment"
        >
            <ToggleButton value="dpt" aria-label="dpt">
                DPT IA
            </ToggleButton>
            <ToggleButton value="fceppd" aria-label="fceppd">
                FCE|PPD
            </ToggleButton>
            <ToggleButton value="referrals" aria-label="referrals">
                Referrals
            </ToggleButton>
            <ToggleButton value="pto" aria-label="pto">
                PT0
            </ToggleButton>
        </ToggleButtonGroup>
        <hr />
        
        {/* {selectedFilter === 'dpt' &&
        <MissingV1500 />
        }
        {selectedFilter === 'fceppd' &&
        <D1500NotSent />
        }
        {selectedFilter === 'referrals' &&
        <AdjusterPastDue />
        } */}
        {selectedFilter === 'pto'
        ?
        <PTOCalendar />
        :
        <>
        <Container style={{background: '#FFFFFF', height: 500, width: '100%'}}>
        {/* <div style={{width: '75%'}}> */}
        <FullCalendar
        // height={500}
        aspectRatio={1.5}
        contentHeight={500}
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        weekends={false}
        events={selectedFilter === 'dpt' ? dptEvents : (selectedFilter === 'fceppd' ? fceEvents : (selectedFilter === 'referrals' ? referralEvents : null))}
        eventOrder="referralDate"
        eventOrderStrict={true}
        eventClick={(e) => handleEventClick(e)}
        />
        {/* </div> */}
        </Container>
        </>
        }
        </Box>
    );
}