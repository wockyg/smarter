import { useState, useContext } from 'react';

import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import GridViewIcon from '@mui/icons-material/GridView';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import FaxIcon from '@mui/icons-material/Fax';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import ScheduleTab from '../schedule/ScheduleTab';
import BillingTab from '../billing-tab/BillingTab';
import SearchTab from '../search/SearchTab';
import CalendarTab from '../calendars/CalendarTab';
import ReportsTab from '../reports/ReportsTab';
import MapTab from '../map/MapTab';
import RecordsRequest from '../2-top/RecordsRequest';
import DashboardCCManager from '../2-top/DashboardCCManager';
import DashboardCC from '../2-top/DashboardCC';
import DashboardCCAdmin from '../2-top/DashboardCCAdmin';

import SampleTable from '../table-components/SampleTable';

import useGetUsers from '../hooks/useGetUsers';

import { UserContext } from '../contexts/UserContext';

import { useParams } from 'react-router-dom';

function TabPanel(props) {
    
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`referrals-tabpanel-${index}`}
      aria-labelledby={`referrals-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `referrals-tab-${index}`,
    'aria-controls': `referrals-tabpanel-${index}`,
  };
}

export default function TopSection() {

    let { id: linkId } = useParams();

    const { status: statusUsers, data: users, error: errorUsers, isFetching: isFetchingUsers } = useGetUsers();

    const { user, navbarTab, setNavbarTab, showCCDash } = useContext(UserContext);

    const showCCDashUser = users && (showCCDash ? users?.filter(u => u?.initials === showCCDash)[0] : user);

    return (
      
    <Box sx={{ width: '100%'}}>
        <TabPanel value={navbarTab} index={0}>
            
            {users && showCCDashUser && user &&
            <>
            {user.admin ?
            <DashboardCCAdmin user={showCCDashUser} />
            // <DashboardCCManager user={user} />
            // <DashboardCC user={user} />
            :
            <DashboardCC user={user} />
            }
            </>
            
            }
        </TabPanel>
        <TabPanel value={navbarTab} index={1}>
            <ScheduleTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={2}>
            <MapTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={3}>
            <RecordsRequest />
        </TabPanel>
         <TabPanel value={navbarTab} index={4}>
            <BillingTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={5}>
            <CalendarTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={6}>
            <ReportsTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={7}>
            <SearchTab />
        </TabPanel>
    </Box>
    
    );
}