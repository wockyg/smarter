import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import QuarterlyReportsSearchBar from './QuarterlyReportsSearchBar';
import QuarterlyReportsTable from './QuarterlyReportsTable';

import useGetReferralsSearchAll from '../hooks/useGetReferralsSearchAll';

import '../App.css';

export default function QuarterlyReports() {

    const { status: statusReferrals, data: referrals, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferralsSearchAll();

    return (
        <>
        {referrals ?
        <Box sx={{ width: '100%', height: 750 }}>
        <Grid container spacing={2}>
            <Grid item>
                <QuarterlyReportsSearchBar />
            </Grid>
            <Box width="100%"/>
            <Grid item xs={12}>
                <QuarterlyReportsTable />
            </Grid>
        </Grid>
        </Box>
        :
        <Skeleton variant="rectangular" width='100%' height={475} />
        }
        </>
    );
}