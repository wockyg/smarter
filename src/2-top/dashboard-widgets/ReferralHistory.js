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
import useGetUserHistory from '../../hooks/useGetUserHistory';
import useUpdateUserHistory from '../../hooks/useUpdateUserHistory';

import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';

import { careCoordinators } from '../../lookup-tables/lookup_careCoordinators';

import '../../App.css';

import { ref } from 'yup';

export default function ReferralHistory(props) {
    
    let { id: linkId } = useParams();

    const { user, handleCloseHistory } = props;

    const navigate = useNavigate();

    const { status: statusRows, data: referrals, error: errorRows, isFetching: isFetchingRows } = useGetReferralsCalendar();

    const { status: statusHistory, data: history, error: errorHistory, isFetching: isFetchingHistory } = useGetUserHistory(`${user.initials}`);

    const userHistoryUpdate = useUpdateUserHistory();

    const rows = history?.map((h, i) => {
        const row = referrals?.filter(r => r.referralId === +h)[0];
        return (
            {
                referralId: row?.referralId,
                assign: row?.assign,
                service: row?.service,
                claimant: row?.claimant
            }
        )
    })

    // console.log(rows);

    const StyledTableCell = styled(TableCell)({
        // padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    });

    const handleClick = (id) => {
        handleCloseHistory();
        id !== +linkId && userHistoryUpdate.mutate({initials: user?.initials, newId: id});
        navigate(`/${id}`);
    };

    let x = 1;

    return(
        <TableContainer
        component={Paper}
        // sx={{ height: 350 }}
        >
            <Table stickyHeader size="small" aria-label="referralsByCC table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>CC</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Claimant</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Service</u></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows?.map((row, j) => {

                                    return (
                                        <TableRow
                                        onClick={() => handleClick(row.referralId)}
                                        hover
                                        key={j}
                                        sx={{ backgroundColor: '#E0ACF5'}}
                                        >
                                            <StyledTableCell>{x++}</StyledTableCell>
                                            <StyledTableCell>{row.assign}</StyledTableCell>
                                            <StyledTableCell>{row.claimant}</StyledTableCell>
                                            <StyledTableCell>{row.service}</StyledTableCell>

                                        </TableRow>
                                    )}
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}