import { useState, useContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import ReferralsOpen from '../schedule/ReferralsOpen';
import RemindersTable from './RemindersTable';
import LastNote14DaysTable from './LastNote14DaysTable';
import FcePpdTomorrow from '../schedule/FcePpdTomorrow';
import FollowupHoldDashboard from '../schedule/FollowupHoldDashboard';

import NextUpCC from './dashboard-widgets/NextUpCC';
import ReferralHistory from './dashboard-widgets/ReferralHistory';

import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { RecordsRequestContext } from '../contexts/RecordsRequestContext';
import { UserContext } from '../contexts/UserContext';

import '../App.css';

import { handleChangePage } from '../7-util/HelperFunctions';

function DashboardTile(props) {

  const { bigNumber, textUnderneath, handleChangeFilter, filter } = props;

  return (
    <Grid item>
        <Paper square>
        <Box 
        onClick={() => handleChangeFilter(filter)}
        sx={{ width: 120, height: 120, paddingTop: 2, cursor: 'pointer', backgroundImage: 'linear-gradient(to bottom right, rgba(66,175,230,0.5), rgba(66,175,230,1))'}}
        >
            <Typography variant="h4" gutterBottom>
                {bigNumber}
            </Typography>
            <Typography variant="h6" gutterBottom>
                {textUnderneath}
            </Typography>
        </Box> 
        </Paper>
    </Grid>
  );
}

export default function DashboardCC(props) {

    const { dashboardFilter, setDashboardFilter } = useContext(UserContext);

    const { user } = props;

    const {
        todayWeekday,
        monday, tuesday, wednesday, thursday, friday,
        mondayISO, tuesdayISO, wednesdayISO, thursdayISO, fridayISO,
    } = useContext(RecordsRequestContext);

    const handleChangeFilter = (newFilter) => {
        if (newFilter !== null){
            setDashboardFilter(newFilter);
        }
    };

    return (
        <Box sx={{ width: '100%', height: 500 }}>

            {/* Dashboard */}
            {user &&
            <Box sx={{ width: '100%'}}>
                <Grid container spacing={2}>

                    <DashboardTile
                    bigNumber={5}
                    textUnderneath={'Open'}
                    handleChangeFilter={handleChangeFilter}
                    filter='open'
                    />

                    {/* <Grid item xs={2}>
                        <Box sx={{ width: '100%', background: '#BABEE5'}}>
                            <u>Monday</u> <u>{mondayISO}</u>
                            <br />
                                <Grid container spacing={1} sx={{padding: 1}}>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: '#48A32C', width: 20, height: 20, fontSize: 12 }}>4</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('open')}>
                                        {` Open/Hold`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: '#48A32C', width: 20, height: 20, fontSize: 12 }}>45</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('reminders')}>
                                        {` Reminders Today`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: deepOrange[500], width: 20, height: 20, fontSize: 12 }}>4</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('14Days')}>
                                        {` 14-21 days since last note`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: deepOrange[500], width: 20, height: 20, fontSize: 12 }}>4</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('tomorrow')}>
                                        {` FCE/PPD tom`}
                                    </Grid>
                                    
                                </Grid>
                            
                            
                        </Box> 
                    </Grid> */}

                    {/* <Grid item xs={2}>
                        <Box sx={{ width: '100%', background: '#BABEE5'}}>
                            <u>Follow-Up</u>
                            <br />
                                <Grid container spacing={1} sx={{padding: 1}}>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: '#48A32C', width: 20, height: 20, fontSize: 12 }}>4</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('needInfo')}>
                                        {` Need Info/Documents`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: '#48A32C', width: 20, height: 20, fontSize: 12 }}>45</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('pendingResponse')}>
                                        {` Pending ADJ/MD Response`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: deepOrange[500], width: 20, height: 20, fontSize: 12 }}>4</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('surgery')}>
                                        {` MRI/Surgery/MD Appt`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: deepOrange[500], width: 20, height: 20, fontSize: 12 }}>4</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('other')}>
                                        {` Other (covid, non-comp.)`}
                                    </Grid>
                                </Grid>
                            
                            
                        </Box> 
                    </Grid> */} 
                    
                    <Box sx={{ width: '100%'}} />
                    <Grid item xs={12}>
                        {dashboardFilter === 'open' &&
                        <ReferralsOpen cc={user.initials} />
                        }
                        {dashboardFilter === 'reminders' &&
                        <RemindersTable cc={user.initials} />
                        }
                        {dashboardFilter === '14Days' &&
                        <LastNote14DaysTable cc={user.initials} />
                        }
                        {dashboardFilter === 'tomorrow' &&
                        <FcePpdTomorrow cc={user.initials} />
                        }
                        {(dashboardFilter === 'needInfo' || dashboardFilter === 'pendingResponse' || dashboardFilter === 'surgery' || dashboardFilter === 'other') &&
                        <FollowupHoldDashboard filter={dashboardFilter} cc={user.initials} />
                        }
                        
                    </Grid>
                    
                </Grid>
            </Box>
            }

        </Box>
    );
}