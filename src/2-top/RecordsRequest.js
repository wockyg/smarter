import { useState, useContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RecordsRequestTable from './RecordsRequestTable';

import { RecordsRequestContext } from '../contexts/RecordsRequestContext';

import { PieChart } from '@mui/x-charts/PieChart';

import '../App.css';

export default function RecordsRequest(props) {

    const {
        todayWeekday,
        preference, setPreference, 
        filter, setFilter, 
        monday, tuesday, wednesday, thursday, friday,
        mondayISO, tuesdayISO, wednesdayISO, thursdayISO, fridayISO,
        numWorked, numTBW, numPending, numFaxReceived, numActive, numFUH, numCaughtUp,
        numWorkedMonday, numFaxReceivedMonday, 
        numWorkedTuesday, numFaxReceivedTuesday, 
        numWorkedWednesday, numFaxReceivedWednesday, 
        numWorkedThursday, numFaxReceivedThursday, 
        numWorkedFriday, numFaxReceivedFriday
    } = useContext(RecordsRequestContext);

    const handlePreference = (event, newPreference) => {
        if (newPreference !== null){
            setPreference(newPreference);
        }
    };

    const handleFilter = (event, newFilter) => {
        if (newFilter !== null){
            setFilter(newFilter);
        }
    };

    return (
        <Box sx={{ width: '100%', height: 700 }}>

            {/* Dashboard */}
            <Box sx={{ width: '100%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', height: 160, padding: 2, fontSize: 14, background: '#BABEE5' }}>
                            Last Worked: 10/31/2023 @ 5:00PM<br />
                            Last Pulled: 10/31/2023 @ 3:00PM<br />
                            <button>Re-Pull</button><br />
                            {`This week: A->Z`}
                        </Box> 
                    </Grid>
                    <Grid item xs={3.5}>
                        <Box sx={{ width: '100%', height: 160 }}>

                            {/* <PieChart
                            sx={{background: '#DC8888'}}
                            slotProps={{ legend: { 
                                            hidden: false,
                                            padding: 0
                                        } 
                            }}
                            series={[
                                {
                                    // arcLabel: (item) => `${item.label} (${item.value})`,
                                    data: [
                                        { id: 0, value: numWorked, label: `Worked (${numWorked})`},
                                        { id: 1, value: numTBW, label: `TBW (${numTBW})`},
                                        // { id: 2, value: numFUH, label: `FU/H (${numFUH})`},
                                    ],
                                },
                            ]}
                            width={300}
                            height={160}
                            margin={{
                                left: -30,
                            }}
                            /> */}

                            {/* <PieChart
                            sx={{background: '#DC8888'}}
                            slotProps={{ legend: { hidden: true } }}
                            series={[
                                {
                                    // arcLabel: (item) => `${item.label} (${item.value})`,
                                    data: [
                                        { id: 0, value: numPending, label: `Pending Response (${numPending})`},
                                        { id: 1, value: numFaxReceived, label: `Fax Received (${numFaxReceived})`},
                                        // { id: 2, value: numFUH, label: `FU/H (${numFUH})`},
                                    ],
                                },
                            ]}
                            width={300}
                            height={160}
                            /> */}

                            {/* <PieChart
                            sx={{background: '#DC8888'}}
                            slotProps={{ legend: { hidden: true } }}
                            series={[
                                {
                                    // arcLabel: (item) => `${item.label} (${item.value})`,
                                    data: [
                                        { id: 0, value: numActive, label: `Active (${numActive})`},
                                        { id: 1, value: numCaughtUp, label: `Caught Up (${numCaughtUp})`},
                                        { id: 2, value: numFUH, label: `FU/H (${numFUH})`},
                                    ],
                                },
                            ]}
                            width={300}
                            height={160}
                            /> */}

                        </Box> 
                        
                    </Grid>
                    <Grid item xs={1.3}>
                        <Box sx={{ width: '100%', height: 160, background: todayWeekday === 1 ? '#9CDC88' : '#BABEE5' }}>
                            <u>Monday {mondayISO}</u>
                            <br />
                            {`${numWorkedMonday} sent`}
                            <br />
                            {`${numFaxReceivedMonday} received`}
                        </Box> 
                    </Grid>
                    <Grid item xs={1.3}>
                        <Box sx={{ width: '100%', height: 160, background: todayWeekday === 2 ? '#9CDC88' : '#BABEE5' }}>
                            <u>Tuesday</u>
                            <br />
                            {`${numWorkedTuesday} sent`}
                            <br />
                            {`${numFaxReceivedTuesday} received`}
                        </Box> 
                    </Grid>
                    <Grid item xs={1.3}>
                        <Box sx={{ width: '100%', height: 160, background: todayWeekday === 3 ? '#9CDC88' : '#BABEE5' }}>
                            <u>Wednesday</u>
                            <br />
                            {`${numWorkedWednesday} sent`}
                            <br />
                            {`${numFaxReceivedWednesday} received`}
                        </Box> 
                    </Grid>
                    <Grid item xs={1.3}>
                        <Box sx={{ width: '100%', height: 160, background: todayWeekday === 4 ? '#9CDC88' : '#BABEE5' }}>
                            <u>Thursday</u>
                            <br />
                            {`${numWorkedThursday} sent`}
                            <br />
                            {`${numFaxReceivedThursday} received`}
                        </Box> 
                    </Grid>
                    <Grid item xs={1.3}>
                        <Box sx={{ width: '100%', height: 160, background: todayWeekday === 5 ? '#9CDC88' : '#BABEE5' }}>
                            <u>Friday</u>
                            <br />
                            {`${numWorkedFriday} sent`}
                            <br />
                            {`${numFaxReceivedFriday} received`}
                        </Box> 
                    </Grid>
                    {/* <Grid item xs={2}>
                        <Box sx={{ width: '100%', height: 130 }}>
                            <Box sx={{ width: '100%', height: ((130/5)-3), background: '#CECFD3', borderRadius: 1, marginBottom: .5 }}>
                                {`${numActive} Total Active (${((numActive / numAttending) * 100).toFixed(0)}%)`}<br />
                            </Box>
                            <Box sx={{ width: '100%', height: ((130/5)-3), background: '#CECFD3', borderRadius: 1, marginBottom: .5 }}>
                                {`${numTBW} TBW (${((numTBW / numActive) * 100).toFixed(0)}%)`}
                            </Box>
                            <Box sx={{ width: '100%', height: ((130/5)-3) * 2, background: '#CECFD3', borderRadius: 1, marginBottom: .5 }}>
                                {`${numWorked} Worked (${((numWorked / numActive) * 100).toFixed(0)}%)`}<br />
                            </Box>
                            <Box sx={{ width: '100%', height: (130/5)-3, background: '#569FF6', borderRadius: 1, marginBottom: .5 }}>
                                {`${numPending} Pending Response (%)`}
                            </Box>
                            <Box sx={{ width: '100%', height: (130/5)-3, background: '#F656D6', borderRadius: 1, marginBottom: .5 }}>
                                {`${numFaxReceived} Faxes Received (%)`}
                            </Box>
                            <Box sx={{ width: '100%', height: (130/5)-3, background: '#B4FAE7', borderRadius: 1, marginBottom: .5 }}>
                                {`${numCaughtUp} Patients Caught Up (%)`}
                            </Box>
                            <Box sx={{ width: '100%', height: (130/5)-3, background: '#FAB1A7', borderRadius: 1, marginBottom: .5 }}>
                                {`${numFUH} Patients FU/H (%)`}
                            </Box>
                            <Box sx={{ width: '100%', height: (130/5)-3, background: '#FFFFFF', borderRadius: 1, marginBottom: .5, border: 1 }}>
                                {`${numAttending} Total Attending`}
                            </Box>
                        </Box> 
                    </Grid> */}
                    
                </Grid>
            </Box>

            <RecordsRequestTable 
            filter={filter}
            handleFilter={handleFilter}
            preference={preference}
            handlePreference={handlePreference}
            />

        </Box>
    );
}