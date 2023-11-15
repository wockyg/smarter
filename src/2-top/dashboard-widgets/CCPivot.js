import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

import { styled } from '@mui/material';

import useGetReferralsCalendar from '../../hooks/useGetReferralsCalendar';

import { useNavigate } from "react-router-dom";

import { careCoordinators } from '../../lookup-tables/lookup_careCoordinators';

import '../../App.css';

import { ref } from 'yup';

export default function CCPivot(props) {

    const { status: statusRows, data: referrals, error: errorRows, isFetching: isFetchingRows } = useGetReferralsCalendar();

    // referrals && console.log(referrals);

    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    });

    return(
        <TableContainer
        component={Paper}
        // sx={{ height: 350 }}
        >
            <Table stickyHeader size="small" aria-label="referralsByCC table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 12 }}><u>CC</u></TableCell>
                        <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u># Files</u></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {careCoordinators && careCoordinators.filter(c => c.Initials !== 'KF' && c.Initials !== 'DM' && c.Initials !== 'WM' && c.Initials !== 'CM' && c.Initials !== 'NS').map((row, j) => {

                                    const ccReferrals = referrals?.filter(r => r.assign === row.Initials && (r.referralStatus === 'Open' || r.referralStatus === 'Hold' || r.referralStatus === 'Reschedule'));

                                    const ccReferralCount = ccReferrals?.length;

                                    return (
                                        <TableRow
                                        hover
                                        key={row.Initials}
                                        sx={{ backgroundColor: '#E0ACF5'}}
                                        >
                                            <StyledTableCell
                                            // sx={{ fontSize: 13, maxWidth: 100, whiteSpace: 'nowrap' }}
                                            >
                                                <u><strong>{row.Initials}</strong></u>
                                            </StyledTableCell>
                                            <StyledTableCell>{ccReferralCount}</StyledTableCell>

                                        </TableRow>
                                    )}
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}