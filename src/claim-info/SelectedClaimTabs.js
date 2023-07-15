import { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import Badge from 'react-bootstrap/Badge';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import InfoIcon from '@mui/icons-material/Info';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RuleIcon from '@mui/icons-material/Rule';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import useGetReferral from '../hooks/useGetReferral';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useParams } from 'react-router-dom';

import ReferralDetails from './ReferralDetails';
import ApptVerification from './ApptVerification';
import AuthorizationTable from './AuthorizationTable';
import DptBilling from './DptBilling';
import FceBilling from './FceBilling';


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

export default function SelectedClaimTabs() {

    let { id: linkId } = useParams();

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    const { tab, setTab } = useContext(SelectedClaimContext);

    const handleChange = (event, newValue) => {
    setTab(selectedClaim ? newValue : 0);
    };

    return (
      <>
      {selectedClaim?.referralId &&
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          
          <Grid container spacing={1.5}>
            <Grid item>
              <h3>
                <Badge bg="secondary">
                    {selectedClaim.claimNumber ? `${selectedClaim.claimantLast}, ${selectedClaim.claimantFirst} | ${selectedClaim.claimNumber}` : `${selectedClaim.claimant}`}
                </Badge>
              </h3>
            </Grid>
            {selectedClaim.serviceGeneral === "FCE" && selectedClaim.confirmAttend === "Yes" &&
            <Grid item xs={12}>
              <FceBilling />
            </Grid>
            }
             <Grid item xs={12}>
              <ReferralDetails />
            </Grid>
          </Grid>

          <Tabs value={tab} onChange={handleChange} aria-label="selectedClaim tabs">
              {selectedClaim.ptStatus !== null && selectedClaim.billingStatus !== null && selectedClaim.serviceGeneral === "DPT" &&
              <Tab icon={<RuleIcon />} {...a11yProps(0)} />
              }
              {selectedClaim.ptStatus !== null && selectedClaim.billingStatus !== null && selectedClaim.serviceGeneral === "DPT" &&
              <Tab icon={<RequestQuoteIcon />} {...a11yProps(1)} />
              }
          </Tabs>

        </Box>

        {/* Appt Verif. Tab */}
        {selectedClaim.ptStatus !== null && selectedClaim.serviceGeneral === "DPT" &&
        <TabPanel value={tab} index={0}>
            <Grid container>
              <Grid item xs={7}>
                <AuthorizationTable />
              </Grid>
              <Grid item xs={2}>
                something here maybe?
              </Grid>
              <Grid item xs={3}>
                SOMETHING ELSE here
              </Grid>
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
      }
      </>
    
    );
}