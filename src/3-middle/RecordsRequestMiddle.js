import React, { useState, useContext } from 'react';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import ApptVerification from '../claim-info/ApptVerification';
import RecordsRequestClaimInfo from './RecordsRequestClaimInfo';
import ReferralNotes from '../claim-info/ReferralNotes';

import useGetReferral from '../hooks/useGetReferral';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useParams } from 'react-router-dom';

export default function RecordsRequestMiddle() {

  let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

  return (
    selectedClaim?.referralId &&
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <ApptVerification />
      </Grid>
      <Grid item xs={5}>
        <RecordsRequestClaimInfo selectedClaim={selectedClaim} /><br />
        <ReferralNotes selectedClaim={selectedClaim} rr={true} />
      </Grid>
    </Grid>
  );
}