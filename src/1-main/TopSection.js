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

import SampleTable from '../table-components/SampleTable';

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

    // const { status: statusReferrals, data: referrals, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferrals();

    const { user, navbarTab, setNavbarTab } = useContext(UserContext);
  
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
    setTab(newValue);
    };

    return (
      
    <Box sx={{ width: '100%'}}>
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 65, background: '#F5F8F9'  }}>
        <Tabs value={tab} onChange={handleChange} aria-label="referral tabs">
            <Tab label={<div><GridViewIcon />{` Dashboard`}</div>} {...a11yProps(0)} />
            <Tab label={<div><PendingActionsIcon />{` Schedule`}</div>} {...a11yProps(1)} />
            <Tab label={<div><FaxIcon />{` Records Req.`}</div>} {...a11yProps(2)} />
            <Tab label={<div><RequestQuoteIcon />{` Billing`}</div>} {...a11yProps(3)} />
            <Tab label={<div><SearchIcon />{` Search`}</div>} {...a11yProps(4)} />
            <Tab label={<div><CalendarMonthIcon />{` Calendars`}</div>} {...a11yProps(5)} />
            <Tab label={<div><AssessmentIcon />{` Reports`}</div>} {...a11yProps(6)} />
            <Tab label={<div><LocationOnIcon />{` Network Map`}</div>} {...a11yProps(7)} />
        </Tabs>
        </Box> */}
        <TabPanel value={navbarTab} index={0}>
            {/* <DashboardCCManager user={user} /> */}
            <DashboardCC user={user} />
        </TabPanel>
        <TabPanel value={navbarTab} index={1}>
            <ScheduleTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={2}>
            <RecordsRequest />
        </TabPanel>
        <TabPanel value={navbarTab} index={3}>
            <BillingTab />
        </TabPanel>
         <TabPanel value={navbarTab} index={4}>
            <SearchTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={5}>
            <CalendarTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={6}>
            <ReportsTab />
        </TabPanel>
        <TabPanel value={navbarTab} index={7}>
            <MapTab />
        </TabPanel>
        {/* <TabPanel value={tab} index={8}>
            <BugReportsTab />
        </TabPanel> */}
    </Box>
    
    );
}