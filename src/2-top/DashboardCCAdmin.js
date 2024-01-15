import { useState, useContext } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import ReferralsOpen from '../schedule/ReferralsOpen';
import RemindersTable from './RemindersTable';
import LastNote14DaysTable from './LastNote14DaysTable';
import FcePpdTomorrow from '../schedule/FcePpdTomorrow';
import FollowupHoldDashboard from '../schedule/FollowupHoldDashboard';
import FcePpdNextWeek from '../schedule/FcePpdNextWeek';
import ReportLimboDashboard from '../schedule/ReportLimboDashboard';
import TrackedDashboard from '../schedule/TrackedDashboard';

import NextUpCC from './dashboard-widgets/NextUpCC';
import ReferralHistory from './dashboard-widgets/ReferralHistory';

import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';

import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';

import { RecordsRequestContext } from '../contexts/RecordsRequestContext';
import { UserContext } from '../contexts/UserContext';

import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';

import useGetReferralsOpenDashboard from '../hooks/useGetReferralsOpenDashboard';
import useGetRemindersDashboard from '../hooks/useGetRemindersDashboard';
import useGetLastNote14DaysCC from '../hooks/useGetLastNote14DaysCC';
import useGetLastNote14Days from '../hooks/useGetLastNote14Days';
import useGetFcePpdTomorrowDashboard from '../hooks/useGetFcePpdTomorrowDashboard';
import useGetFcePpdNextWeekDashboard from '../hooks/useGetFcePpdNextWeekDashboard';
import useGetReferralsFollowUpHoldDashboard from '../hooks/useGetReferralsFollowUpHoldDashboard';
import useGetReferralsReportLimbo from '../hooks/useGetReferralsReportLimbo';
import useUpdateUser from '../hooks/useUpdateUser';
import useGetTrackedFilesCC from '../hooks/useGetTrackedFilesCC';
import useGetTrackedFilesAll from '../hooks/useGetTrackedFilesAll';
import useGetUsers from '../hooks/useGetUsers';

import '../App.css';

import { handleChangePage } from '../7-util/HelperFunctions';

const selectedColor = '#4259E6';
const baseColor = '#42AFE6';

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

export default function DashboardCCAdmin(props) {

    const { dashboardFilter, setDashboardFilter, showCCDash, setShowCCDash, user: realUser } = useContext(UserContext);

    const { user } = props;

    const { status: statusReferralsOpen, data: rowsOpen, error: errorReferralsOpen, isFetching: isFetchingReferralsOpen } = useGetReferralsOpenDashboard(`${user.initials}${user.covering || ''}`);
    const { status: statusReferralsReminders, data: rowsReminders, error: errorReferralsReminders, isFetching: isFetchingReferralsReminders } = useGetRemindersDashboard(`${user.initials}${user.covering || ''}`);
    const { status: statusReferrals14Days, data: rows14Days, error: errorReferrals14Days, isFetching: isFetchingReferrals14Days } = useGetLastNote14DaysCC(`${user.initials}${user.covering || ''}`);
    const { status: statusReferralsTomorrow, data: rowsTomorrow, error: errorReferralsTomorrow, isFetching: isFetchingReferralsTomorrow } = useGetFcePpdTomorrowDashboard(`${user.initials}${user.covering || ''}`);
    const { status: statusReferralsNextWeek, data: rowsNextWeek, error: errorReferralsNextWeek, isFetching: isFetchingReferralsNextWeek } = useGetFcePpdNextWeekDashboard(`${user.initials}${user.covering || ''}`);
    const { status: statusReferralsFuHold, data: rowsFuHold, error: errorReferralsFuHold, isFetching: isFetchingReferralsFuHold } = useGetReferralsFollowUpHoldDashboard(`${user.initials}${user.covering || ''}`);
    const { status: statusReferralsReportLimbo, data: rowsReportLimbo, error: errorReferralsReportLimbo, isFetching: isFetchingReferralsReportLimbo } = useGetReferralsReportLimbo();
    
    const { status: statusReferralsTracked, data: rowsTracked, error: errorReferralsTracked, isFetching: isFetchingReferralsTracked } = useGetTrackedFilesAll();

    const { status: statusUsers, data: users, error: errorUsers, isFetching: isFetchingUsers } = useGetUsers();

    const userUpdate = useUpdateUser();

    // console.log(rowsTracked);

    // console.log("re-render Dashboard");
    // console.log("(Dash) user.initials:", user.initials);
    // console.log("(Dash) user.covering:", user.covering);
    // console.log(Boolean(user?.covering));
    
    const [isCovering, setIsCovering] = useState(Boolean(user?.covering));

    // let isCovering = Boolean(user.covering);

    // console.log("(Dash) isCovering:", isCovering);

    const [trackedFilter, setTrackedFilter] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const startDate = new Date(year, 0, 1);
    const days = Math.floor(((currentDate - startDate) / (24 * 60 * 60 * 1000)) + 1);
    const currentWeekNumber = Math.ceil(days / 7);
    // console.log(currentWeekNumber);

    const late = rows14Days?.filter(r => {

      const date = new Date(r.lastNote);
      const year = date.getFullYear();
      const startDate = new Date(year, 0, 1);
      const days = Math.floor(((date - startDate) / (24 * 60 * 60 * 1000)) + 1);
      const weekNumber = Math.ceil(days / 7);
    //   console.log(weekNumber);

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

        return r.reminderDate === new Date().toISOString().split('T')[0]
    });

    const limboFiltered = rowsReportLimbo?.filter(r => (r.assign === user.initials || r.assign === user.covering) && r.reportToAdjuster !== null && r.reportToPhysician === null);

    const rowsNeedUCA = rowsFuHold?.filter(r => r.fuHoldNotes === "Need Upcoming appts");

    const rowsNeedPNDC = rowsFuHold?.filter(r => r.fuHoldNotes === "Need DC note" || r.fuHoldNotes === "Pending PN");

    const rowsPendingResponse = rowsFuHold?.filter(r => r.fuHoldNotes === 'Lvm for MD' || 
                                                       r.fuHoldNotes === 'Pending Adj Response' || 
                                                       r.fuHoldNotes === 'Awaiting auth' || 
                                                       r.fuHoldNotes === 'Pending signed PN');
                                                       
    const rowsOther = rowsFuHold?.filter(r => r.fuHoldNotes === 'Surgery' || 
                                             r.fuHoldNotes === 'MRI' || 
                                             r.fuHoldNotes === 'Pending MD appt' ||
                                             r.fuHoldNotes === 'Other' || 
                                             r.fuHoldNotes === 'COVID' || 
                                             r.fuHoldNotes === 'Non-compliant')


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

    const handleChangeIsCovering = (event) => {
        setIsCovering(event.target.checked);
        // isCovering = event.target.checked;
        if(!event.target.checked && user.covering) {
            userUpdate.mutate({initials: user.initials, covering: null})
        }
        // console.log(isCovering);
    };

    const handleChangeCoveringCC = (e) => {
        // setCoveringCC(e.target.value);
        userUpdate.mutate({initials: user.initials, covering: e.target.value});
        // setIsCovering(user.covering ? true : false);

    };

    const handleTrackedFilter = (event, newFilter) => {
        if (newFilter !== null){
            setTrackedFilter(newFilter);
        }
    };

    const handleOpenMenu = (event, id) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleSwitchCC = (e, cc) => {
        cc.initials === realUser.initials ? setShowCCDash(null) : setShowCCDash(cc.initials);
        handleCloseMenu();
    };

    const handleResetDash = () => {
        setShowCCDash(null);
        handleCloseMenu();
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
                    textUnderneath={'Reminders Today'}
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
                    bigNumber={rowsNextWeek?.length}
                    textUnderneath={'FCE/PPD Next Week'}
                    handleChangeFilter={handleChangeFilter}
                    filter='nextWeek'
                    dashboardFilter={dashboardFilter}
                    />

                    <DashboardTile
                    bigNumber={limboFiltered?.length}
                    textUnderneath={'Reports to MD'}
                    handleChangeFilter={handleChangeFilter}
                    filter='limbo'
                    dashboardFilter={dashboardFilter}
                    />

                    <Grid item>
                        {/* <FormControl >
                            <InputLabel id="demo-simple-select-label">CC</InputLabel>
                            <Select
                            sx={{minWidth: '10ch'}}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={showDashCC || ''}
                            label="CC"
                            onChange={(e) => handleChangeShowDash(e)}
                            >
                                <MenuItem value={null}>{`---`}</MenuItem>
                                {careCoordinators.filter(c => c.Initials !== user.initials).map((c, i) => (
                                    <MenuItem key={i} value={c.Initials}>{`${c.Initials}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl> */}
                    </Grid>

                    <Grid item xs={2}>
                        <Paper square>
                        <Box sx={{ width: '100%', background: 'linear-gradient(to bottom right, rgba(178, 186, 187 ,0.5), rgba(178, 186, 187 ,1))'}}>
                            {/* <u>Follow-Up</u>
                            <br /> */}
                                <Grid container spacing={1} sx={{paddingLeft: 1}}>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: dashboardFilter === 'needUCA' ? selectedColor : baseColor, width: 20, height: 20, fontSize: 12 }}>{rowsNeedUCA?.length}</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('needUCA')}>
                                        {` Need Upcoming Appts`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: dashboardFilter === 'needPNDC' ? selectedColor : baseColor, width: 20, height: 20, fontSize: 12 }}>{rowsNeedPNDC?.length}</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('needPNDC')}>
                                        {` Need PN/DC`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: dashboardFilter === 'pendingResponse' ? selectedColor : baseColor, width: 20, height: 20, fontSize: 12 }}>{rowsPendingResponse?.length}</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('pendingResponse')}>
                                        {` Pending ADJ/MD Response`}
                                    </Grid>
                                    <Box width="100%"/>
                                    <Grid item>
                                        <Avatar sx={{ bgcolor: dashboardFilter === 'other' ? selectedColor : baseColor, width: 20, height: 20, fontSize: 12 }}>{rowsOther?.length}</Avatar>
                                    </Grid>
                                    <Grid item sx={{cursor: 'pointer'}} onClick={() => handleChangeFilter('other')}>
                                        {` Other`}
                                    </Grid>
                                </Grid>
                        </Box> 
                        </Paper>
                    </Grid> 

                    <Grid item xs={2.8}>
                        <Paper square>
                        <Box sx={{ width: '100%', background: 'linear-gradient(to bottom right, rgba(178, 186, 187 ,0.5), rgba(178, 186, 187 ,1))'}}>
                            
                                <Grid container spacing={1} sx={{paddingLeft: 1}}>

                                    <Grid item sx={{marginTop: 1}}>
                                        <Checkbox
                                        checked={isCovering}
                                        // checked={user?.covering ? true : false}
                                        onChange={handleChangeIsCovering}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    </Grid>

                                    <Grid item sx={{marginTop: 2}}>
                                        I am covering for 
                                    </Grid>

                                    <Grid item>
                                        <FormControl >
                                            <InputLabel id="demo-simple-select-label">CC</InputLabel>
                                            <Select
                                            // disabled={!isCovering}
                                            disabled={!isCovering}
                                            sx={{minWidth: '10ch'}}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={user.covering || ''}
                                            label="CC"
                                            onChange={(e) => handleChangeCoveringCC(e)}
                                            >
                                                <MenuItem value={null}>{`---`}</MenuItem>
                                                {careCoordinators.filter(c => c.Initials !== user.initials).map((c, i) => (
                                                    <MenuItem key={i} value={c.Initials}>{`${c.Initials}`}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item sx={{marginTop: 2}}>
                                        today
                                    </Grid>
                                    
                                    <Box width="100%"/>

                                    <Grid item>
                                        
                                    </Grid>
                                    
                                </Grid>
                        </Box>

                        </Paper>
                        
                            <Grid container>
                                <Grid item xs={6}>
                                    <Paper square>
                                    <Box 
                                    sx={{ width: '100%', cursor: 'pointer', marginTop: 3, background: dashboardFilter === 'tracked' ? 'linear-gradient(to bottom right, rgba(66,89,230,0.5), rgba(66, 89, 230,1))' : 'linear-gradient(to bottom right, rgba(178, 186, 187 ,0.5), rgba(178, 186, 187 ,1))'}}
                                    onClick={() => handleChangeFilter('tracked')}
                                    >
                                        Tracked files
                                    </Box>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Paper square sx={{marginLeft: 1}}>
                                    <Box 
                                    sx={{ width: '100%', cursor: 'pointer', marginTop: 3, background: 'linear-gradient(to bottom right, rgba(178, 186, 187 ,0.5), rgba(178, 186, 187 ,1))'}}
                                    onClick={handleOpenMenu}
                                    >
                                        Showing: {showCCDash || `You (${realUser?.initials})`}
                                        
                                    </Box>
                                    {showCCDash && <IconButton><CancelIcon fontSize='small' onClick={handleResetDash} /></IconButton>}
                                    <Menu
                                        id="delete-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleCloseMenu}
                                        >
                                            {users.filter(u => u.role === 'CC' && u.initials !== user.initials && u.initials !== 'DM' && u.initials !== 'CM' && u.initials !== 'DM' && u.initials !== 'WM' && u.initials !== 'NS' && u.initials !== 'KF').map((c, i) => (
                                            <MenuItem
                                            key={i}
                                            onClick={(e) => handleSwitchCC(e, c)}
                                            >
                                                Switch to {c?.initials}
                                            </MenuItem>
                                            ))}

                                        </Menu>
                                    </Paper>
                                </Grid>
                            </Grid>
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
                        {dashboardFilter === 'nextWeek' &&
                        <FcePpdNextWeek cc={user.initials} ccRows={rowsNextWeek} />
                        }
                        {dashboardFilter === 'limbo' &&
                        <ReportLimboDashboard cc={user.initials} ccRows={limboFiltered} />
                        }
                        {dashboardFilter === 'needUCA' &&
                        <FollowupHoldDashboard filter={dashboardFilter} cc={user.initials} ccRows={rowsNeedUCA} />
                        }
                        {dashboardFilter === 'needPNDC' &&
                        <FollowupHoldDashboard filter={dashboardFilter} cc={user.initials} ccRows={rowsNeedPNDC} />
                        }
                        {dashboardFilter === 'pendingResponse' &&
                        <FollowupHoldDashboard filter={dashboardFilter} cc={user.initials} ccRows={rowsPendingResponse} />
                        }
                        {dashboardFilter === 'other' &&
                        <FollowupHoldDashboard filter={dashboardFilter} cc={user.initials} ccRows={rowsOther} />
                        }
                        {dashboardFilter === 'tracked' &&
                        <>
                        {user.admin && 

                        <ToggleButtonGroup
                        size="small"
                        value={trackedFilter}
                        exclusive
                        onChange={handleTrackedFilter}
                        aria-label="text alignment"
                        >
                            {users.filter(u => u.role === 'CC' && u.initials !== 'NS' && u.initials !== 'CM' && u.initials !== 'DM' && u.initials !== 'KF' && u.initials !== 'WM').map(c => (
                            <ToggleButton value={c.initials} aria-label="open">
                                {c.initials} ({rowsTracked.filter(r => r.assign === c.initials).length})
                            </ToggleButton>
                            ))}
                            
                        </ToggleButtonGroup>

                        }
                        <TrackedDashboard filter={dashboardFilter} cc={user.initials} ccRows={rowsTracked.filter(r => r.assign === trackedFilter)} />
                        </>
                        }
                        
                    </Grid>
                    
                </Grid>
            </Box>
            }

        </Box>
    );
}