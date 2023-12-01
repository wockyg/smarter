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

import useGetReferralsOpenDashboard from '../hooks/useGetReferralsOpenDashboard';
import useGetRemindersDashboard from '../hooks/useGetRemindersDashboard';
import useGetLastNote14DaysCC from '../hooks/useGetLastNote14DaysCC';
import useGetFcePpdTomorrowDashboard from '../hooks/useGetFcePpdTomorrowDashboard';
import useGetReferralsFollowUpHoldDashboard from '../hooks/useGetReferralsFollowUpHoldDashboard'

import '../App.css';

import { handleChangePage } from '../7-util/HelperFunctions';

function DashboardTile(props) {

  const { bigNumber, textUnderneath, handleChangeFilter, filter, dashboardFilter } = props;

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
            backgroundImage: filter === dashboardFilter ? 'linear-gradient(to bottom right, rgba(66,89,230,0.5), rgba(66, 89, 230,1))' : 'linear-gradient(to bottom right, rgba(66,175,230,0.5), rgba(66,175,230,1))'
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

export default function DashboardCC(props) {

    const { dashboardFilter, setDashboardFilter } = useContext(UserContext);

    const { user } = props;

    const { status: statusReferralsOpen, data: rowsOpen, error: errorReferralsOpen, isFetching: isFetchingReferralsOpen } = useGetReferralsOpenDashboard(user.initials);
    const { status: statusReferralsReminders, data: rowsReminders, error: errorReferralsReminders, isFetching: isFetchingReferralsReminders } = useGetRemindersDashboard(user.initials);
    const { status: statusReferrals14Days, data: rows14Days, error: errorReferrals14Days, isFetching: isFetchingReferrals14Days } = useGetLastNote14DaysCC(user.initials);
    const { status: statusReferralsTomorrow, data: rowsTomorrow, error: errorReferralsTomorrow, isFetching: isFetchingReferralsTomorrow } = useGetFcePpdTomorrowDashboard(user.initials);
    const { status: statusReferralsFuHold, data: rowsFuHold, error: errorReferralsFuHold, isFetching: isFetchingReferralsFuHold } = useGetReferralsFollowUpHoldDashboard(user.initials);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const startDate = new Date(year, 0, 1);
    const days = Math.floor(((currentDate - startDate) / (24 * 60 * 60 * 1000)) + 1);
    const currentWeekNumber = Math.ceil(days / 7);

    const late = rows14Days?.filter(r => {

      const date = new Date(r.lastNote);
      const year = date.getFullYear();
      const startDate = new Date(year, 0, 1);
      const days = Math.floor(((date - startDate) / (24 * 60 * 60 * 1000)) + 1);
      const weekNumber = Math.ceil(days / 7);

      return weekNumber > currentWeekNumber - 3;

    });
    
    const superLate = rows14Days?.filter(r => {

      const date = new Date(r.lastNote);
      const year = date.getFullYear();
      const startDate = new Date(year, 0, 1);
      const days = Math.floor(((date - startDate) / (24 * 60 * 60 * 1000)) + 1);
      const weekNumber = Math.ceil(days / 7);

      return weekNumber <= currentWeekNumber - 3;

    });

    const remindersFiltered = rowsReminders?.filter(r => {
        
        return new Date(r.reminderDate) >= new Date('2023-12-01')
    });

    console.log(remindersFiltered);

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
                    bigNumber={rowsOpen?.length}
                    textUnderneath={'Open'}
                    handleChangeFilter={handleChangeFilter}
                    filter='open'
                    dashboardFilter={dashboardFilter}
                    />

                    <DashboardTile
                    bigNumber={remindersFiltered?.length}
                    textUnderneath={'Reminders'}
                    handleChangeFilter={handleChangeFilter}
                    filter='reminders'
                    dashboardFilter={dashboardFilter}
                    />

                    <DashboardTile
                    bigNumber={late?.length}
                    textUnderneath={'14 Days (This Week)'}
                    handleChangeFilter={handleChangeFilter}
                    filter='14days'
                    dashboardFilter={dashboardFilter}
                    />

                    <DashboardTile
                    bigNumber={superLate?.length}
                    textUnderneath={'14 Days (Last Week)'}
                    handleChangeFilter={handleChangeFilter}
                    filter='superLate'
                    dashboardFilter={dashboardFilter}
                    />

                    <DashboardTile
                    bigNumber={rowsTomorrow?.length}
                    textUnderneath={'FCE/PPD Tomorrow'}
                    handleChangeFilter={handleChangeFilter}
                    filter='tomorrow'
                    dashboardFilter={dashboardFilter}
                    />

                    <DashboardTile
                    bigNumber={rowsTomorrow?.length}
                    textUnderneath={'FCE/PPD Tomorrow'}
                    handleChangeFilter={handleChangeFilter}
                    filter='tomorrow'
                    dashboardFilter={dashboardFilter}
                    />

                    <Grid item xs={2}>
                        <Box sx={{ width: '100%', background: '#BABEE5'}}>
                            {/* <u>Follow-Up</u>
                            <br /> */}
                                <Grid container spacing={1} sx={{paddingLeft: 1}}>
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
                    </Grid> 
                    
                    <Box sx={{ width: '100%'}} />
                    <Grid item xs={12}>
                        {dashboardFilter === 'open' &&
                        <ReferralsOpen cc={user.initials} ccRows={rowsOpen} />
                        }
                        {dashboardFilter === 'reminders' &&
                        <RemindersTable cc={user.initials} ccRows={remindersFiltered} />
                        }
                        {dashboardFilter === '14days' &&
                        <LastNote14DaysTable cc={user.initials} ccRows={late} />
                        }
                        {dashboardFilter === 'superLate' &&
                        <LastNote14DaysTable cc={user.initials} ccRows={superLate} />
                        }
                        {dashboardFilter === 'tomorrow' &&
                        <FcePpdTomorrow cc={user.initials} ccRows={rowsTomorrow} />
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