import { useState, useContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import RecordsRequestTable from './RecordsRequestTable';

import useGetRRLastWorked from '../hooks/useGetRRLastWorked';
import useUpdateRRLastWorked from '../hooks/useUpdateRRLastWorked';
import useGetAscending from '../hooks/useGetAscending'

import { RecordsRequestContext } from '../contexts/RecordsRequestContext';

import { PieChart } from '@mui/x-charts/PieChart';

import '../App.css';

function DashboardTile(props) {

  const { bigNumber, textUnderneath, handleChangeFilter, filter, dashboardFilter, weekday, todayWeekday } = props;

  return (
    <Grid item>
        <Paper square>
        <Box 
        onClick={() => handleChangeFilter(filter)}
        sx={{ 
            width: 120, 
            height: 120, 
            paddingTop: 2, 
            cursor: 'pointer', 
            background: todayWeekday === weekday ? '#9CDC88' : '#BABEE5'
            // backgroundImage: filter === dashboardFilter ? 'linear-gradient(to bottom right, rgba(66,89,230,0.5), rgba(66, 89, 230,1))' : 'linear-gradient(to bottom right, rgba(66,175,230,0.5), rgba(66,175,230,1))'
        }}
        >
            <Typography variant="h4">
                {bigNumber}
            </Typography>
            <Typography variant="h6">
                {textUnderneath}
            </Typography>
        </Box> 
        </Paper>
    </Grid>
  );
}


export default function RecordsRequest(props) {

    const { status: statusRRLastWorked, data: rrLastWorked, error: errorRRLastWorked, isFetching: isFetchingRRLastWorked } = useGetRRLastWorked();
    const { status: statusAscending, data: ascending, error: errorAscending, isFetching: isFetchingAscending } = useGetAscending();

    // console.log(ascending);

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
        rrLastWorked &&
        <Box sx={{ width: '100%', height: 700 }}>

            {/* Dashboard */}
            <Box sx={{ width: '100%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', height: 160, padding: 1, fontSize: 14, background: '#BABEE5' }}>
                            <u>{`Last Worked:`}</u><br />
                            {`${new Date(rrLastWorked)?.toISOString().split('T')[0]} @ ${new Date(rrLastWorked).toLocaleTimeString('en-US')}`}<br />
                            <br />
                            {ascending ? `This week: A->Z` : `This week: Z->A`}
                        </Box> 
                    </Grid>
                    <Grid item xs={3.5}>
                        <Box sx={{ width: '100%', height: 180 }}>
                            {/* <Typography>This Week</Typography> */}
                            <PieChart
                            // sx={{background: '#DC8888'}}
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
                            />

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
                    <DashboardTile
                    bigNumber={numWorkedMonday}
                    textUnderneath={'Monday'}
                    filter='monday'
                    weekday={1}
                    todayWeekday={todayWeekday}
                    // dashboardFilter={dashboardFilter}
                    // handleChangeFilter={handleChangeFilter}
                    />
                    <DashboardTile
                    bigNumber={numWorkedTuesday}
                    textUnderneath={'Tuesday'}
                    filter='tuesday'
                    weekday={2}
                    todayWeekday={todayWeekday}
                    // dashboardFilter={dashboardFilter}
                    // handleChangeFilter={handleChangeFilter}
                    />

                    <DashboardTile
                    bigNumber={numWorkedWednesday}
                    textUnderneath={'Wednesday'}
                    filter='wednesday'
                    weekday={3}
                    todayWeekday={todayWeekday}
                    // dashboardFilter={dashboardFilter}
                    // handleChangeFilter={handleChangeFilter}
                    />

                    <DashboardTile
                    bigNumber={numWorkedThursday}
                    textUnderneath={'Thursday'}
                    filter='thursday'
                    weekday={4}
                    todayWeekday={todayWeekday}
                    // dashboardFilter={dashboardFilter}
                    // handleChangeFilter={handleChangeFilter}
                    />

                    <DashboardTile
                    bigNumber={numWorkedFriday}
                    textUnderneath={'Friday'}
                    filter='friday'
                    weekday={5}
                    todayWeekday={todayWeekday}
                    // dashboardFilter={dashboardFilter}
                    // handleChangeFilter={handleChangeFilter}
                    />
                    
                    
                    {/* <Grid item xs={1.3}>
                        <Box sx={{ width: '100%', height: 160, background: todayWeekday === 5 ? '#9CDC88' : '#BABEE5' }}>
                            <u>Friday</u>
                            <br />
                            {`${numWorkedFriday}`}
                            <br />
                            {`sent`}
                        </Box> 
                    </Grid> */}

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
            ascending={ascending}
            />

        </Box>
    );
}