import { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RecordsRequestTable from './RecordsRequestTable';
import useGetRecordsRequest from '../hooks/useGetRecordsRequest';

import CCPivot from './dashboard-widgets/CCPivot';
import NextUpCC from './dashboard-widgets/NextUpCC';

import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

import '../App.css';

export default function DashboardCCManager(props) {

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
        <Box sx={{ width: '100%', height: 500 }}>

            {/* Dashboard */}
            <Box sx={{ width: '100%'}}>
                <Grid container spacing={2}>
                    <Grid item xs={1}>
                        <Box sx={{ width: '100%', height: 160, background: '#BABEE5' }}>
                            <u>Referrals by CC</u>
                            <br />
                            <CCPivot />
                        </Box> 
                    </Grid>
                    <Grid item xs={2.5}>
                        <Box sx={{ width: '100%', height: 160, background: '#BABEE5' }}>
                            <u>Next Up CC/Most Recent Referrals</u>
                            <br />
                            <NextUpCC />
                        </Box> 
                        
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', height: 160, background: '#BABEE5' }}>
                            <u>Recently Visited/History</u>
                            <br />
                            
                        </Box> 
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', height: 160, background: '#BABEE5' }}>
                            <u>RR Synopsis</u>
                            <br />
                            
                        </Box> 
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', height: 160, background: '#BABEE5' }}>
                            <u>CC's Off this week</u>
                            <br />
                            
                        </Box> 
                    </Grid>
                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', height: 160, background: '#BABEE5' }}>
                            <u>Stats</u>
                            <br />
                            
                        </Box> 
                    </Grid>
                    <Box sx={{ width: '100%'}} />
                    {/* <Grid item xs={4}>
                        <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={500}
                        height={300}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        width={500}
                        height={300}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <PieChart
                        series={[
                            {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
                            },
                        ]}
                        width={400}
                        height={250}
                        />
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

        </Box>
    );
}