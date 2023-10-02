import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RuleIcon from '@mui/icons-material/Rule';

import useGetReferral from '../hooks/useGetReferral';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useParams } from 'react-router-dom';

import ApptVerification from '../claim-info/ApptVerification';
import DptBilling from '../claim-info/DptBilling';


function TabPanel(props) {
    
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`selectedClaim-tabpanel-${index}`}
      aria-labelledby={`selectedClaim-tab-${index}`}
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
    id: `selectedClaim-tab-${index}`,
    'aria-controls': `selectedClaim-tabpanel-${index}`,
  };
}

export default function BottomSection() {

    let { id: linkId } = useParams();

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    const { tab, setTab } = useContext(SelectedClaimContext);

    const handleChange = (event, newValue) => {
    setTab(selectedClaim ? newValue : 0);
    };

    return (
      <>
      {selectedClaim?.referralId &&
      <>
      <Box sx={{ width: '100%' }}>
         <Tabs value={tab} onChange={handleChange} aria-label="selectedClaim tabs">
              {selectedClaim.ptStatus !== null && selectedClaim.billingStatus !== null && selectedClaim.serviceGeneral === "DPT" &&
              <Tab icon={<RuleIcon />} {...a11yProps(0)} />
              }
              {selectedClaim.ptStatus !== null && selectedClaim.billingStatus !== null && selectedClaim.serviceGeneral === "DPT" &&
              <Tab icon={<RequestQuoteIcon />} {...a11yProps(1)} />
              }
          </Tabs>

        {/* Appt Verif. Tab */}
        {selectedClaim.ptStatus !== null && selectedClaim.serviceGeneral === "DPT" &&
        <TabPanel value={tab} index={0}>
            <Grid container>
              <Grid item xs={12}>
                <ApptVerification />
              </Grid>
            </Grid>
        </TabPanel>
        }

        {/* Billing Tab */}
        {selectedClaim.billingStatus !== null &&
        <TabPanel value={tab} index={1}>
            {selectedClaim.serviceGeneral === "DPT" &&
            <DptBilling />
            }
        </TabPanel>
        }
      </Box>
      </>
      }
      </>
    
    );
}