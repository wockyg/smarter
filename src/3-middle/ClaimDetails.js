import { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import useGetReferral from '../hooks/useGetReferral';

import { useParams } from 'react-router-dom';

import ReferralDetails from '../claim-info/ReferralDetails';
import FceBilling from '../claim-info/FceBilling';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';


export default function ClaimDetails() {

    let { id: linkId } = useParams();

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    const { setKeepBillMode } = useContext(SelectedClaimContext);

    setKeepBillMode(false);

    return (
      <>
      {selectedClaim?.referralId &&
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Grid container spacing={1.5}>

            {selectedClaim.serviceGeneral === "FCE" && selectedClaim.confirmAttend === "Yes" &&
            <Grid item xs={12}>
              <FceBilling />
            </Grid>
            }

            <Grid item xs={12}>
              <ReferralDetails />
            </Grid>

          </Grid>
        </Box>
      </Box>
      }
      </>
    
    );
}