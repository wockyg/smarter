import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RecordsRequestTable from './RecordsRequestTable';
import useGetRecordsRequest from '../hooks/useGetRecordsRequest';

import { PieChart } from '@mui/x-charts/PieChart';

import '../App.css';

export default function RecordsRequest(props) {

    const [preference, setPreference] = useState("fax");
    const [filter, setFilter] = useState("tbw");

    const todayDate = new Date();
    const todayWeekday = todayDate.getDay();
    // console.log(todayDate);

    const monday = new Date();
    monday.setDate(monday.getDate() - (todayWeekday - 1));
    const mondayISO = monday.toISOString().split('T')[0];
    // console.log(monday);

    const tuesday = new Date();
    tuesday.setDate(tuesday.getDate() - (todayWeekday - 2));
    const tuesdayISO = tuesday.toISOString().split('T')[0];
    // console.log(tuesday);

    const wednesday = new Date();
    wednesday.setDate(wednesday.getDate() - (todayWeekday - 3));
    const wednesdayISO = wednesday.toISOString().split('T')[0];
    // console.log(wednesday);

    const thursday = new Date();
    thursday.setDate(thursday.getDate() - (todayWeekday - 4));
    const thursdayISO = thursday.toISOString().split('T')[0];
    // console.log(thursday);

    const friday = new Date();
    friday.setDate(friday.getDate() - (todayWeekday - 5));
    const fridayISO = friday.toISOString().split('T')[0];
    // console.log(friday);

    
    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetRecordsRequest();

    const numTBW = rows?.filter(r => r.worked === null).length;
    const worked = rows?.filter(r => r.worked !== null && r.worked !== 'FU/H' && r.worked !== "Caught Up");
    const numWorked = worked?.length;
    const numFUH = rows?.filter(r => r.worked === 'FU/H').length;
    const numCaughtUp = rows?.filter(r => r.worked === 'Caught Up').length;
    const faxReceived = rows?.filter(r => r.rrFaxReceived !== null);
    const numFaxReceived = faxReceived?.length;
    const numAttending = rows?.length;
    const numActive = numAttending - numCaughtUp - numFUH;
    const numPending = numWorked - numFaxReceived;

    // Monday
    const numWorkedMonday = worked?.filter(w => w.worked === mondayISO).length;
    const numFaxReceivedMonday = faxReceived?.filter(f => f.rrFaxReceived === mondayISO).length;

    // Tueday
    const numWorkedTuesday = worked?.filter(w => w.worked === tuesdayISO).length;
    const numFaxReceivedTuesday = faxReceived?.filter(f => f.rrFaxReceived === tuesdayISO).length;

    // Wednesday
    const numWorkedWednesday = worked?.filter(w => w.worked === wednesdayISO).length;
    const numFaxReceivedWednesday = faxReceived?.filter(f => f.rrFaxReceived === wednesdayISO).length;

    // Thursday
    const numWorkedThursday = worked?.filter(w => w.worked === thursdayISO).length;
    const numFaxReceivedThursday = faxReceived?.filter(f => f.rrFaxReceived === thursdayISO).length;

    // Friday
    const numWorkedFriday = worked?.filter(w => w.worked === fridayISO).length;
    const numFaxReceivedFriday = faxReceived?.filter(f => f.rrFaxReceived === fridayISO).length;

    console.log('M', numFaxReceivedMonday);
    console.log('T', numFaxReceivedTuesday);
    console.log('W', numFaxReceivedWednesday);
    console.log('R', numFaxReceivedThursday);
    console.log('F', numFaxReceivedFriday);

    // console.log(faxReceived);

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