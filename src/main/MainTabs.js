import { useState, useContext } from 'react';

import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import useGetReferrals from '../hooks/useGetReferrals';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import ScheduleTab from '../schedule-tab/ScheduleTab';
import BillingTab from '../billing-tab/BillingTab';
import SearchTab from '../search-tab/SearchTab';

import SampleTable from '../schedule-tab/SampleTable';

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

export default function MainTabs() {

    let { id: linkId } = useParams();

    // const { status: statusReferrals, data: referrals, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferrals();

    // const { setSelectedClaimId, setPage, setTab: setClaimTab } = useContext(SelectedClaimContext);
  
    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
    setTab(newValue);
    };

    return (
    // this is cool
    <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={handleChange} aria-label="referral tabs">
            <Tab label="Schedule" {...a11yProps(0)} />
            <Tab label="Billing" {...a11yProps(1)} />
            <Tab label="Search" {...a11yProps(2)} />
            <Tab label="Calendars" {...a11yProps(3)} />
            <Tab label="Reports" {...a11yProps(4)} />
        </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
            <ScheduleTab />
        </TabPanel>
        <TabPanel value={tab} index={1}>
            <BillingTab />
        </TabPanel>
         <TabPanel value={tab} index={2}>
            <SearchTab />
        </TabPanel>
        <TabPanel value={tab} index={3}>
            <SampleTable />
        </TabPanel>
    </Box>
    
    );
}