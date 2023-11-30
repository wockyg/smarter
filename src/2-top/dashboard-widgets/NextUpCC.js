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
import useUpdateUserHistory from '../../hooks/useUpdateUserHistory';

import { useNavigate } from "react-router-dom";

import { useParams } from 'react-router-dom';

import { careCoordinators } from '../../lookup-tables/lookup_careCoordinators';

import '../../App.css';

import { ref } from 'yup';

export default function NextUpCC(props) {

    let { id: linkId } = useParams();

    const { user } = props;

    const navigate = useNavigate();

    const { status: statusRows, data: referrals, error: errorRows, isFetching: isFetchingRows } = useGetReferralsCalendar();

    const userHistoryUpdate = useUpdateUserHistory();

    const last6Referrals = referrals?.slice(0, 6);

    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    });

    const handleClick = (id) => {
        console.log(id)
        console.log(linkId)
        id !== +linkId && userHistoryUpdate.mutate({initials: user?.initials, newId: id});
        navigate(`/${id}`);
    };

    return(
        <TableContainer
        component={Paper}
        // sx={{ height: 350 }}
        >
            <Table stickyHeader size="small" aria-label="referralsByCC table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 12 }}><u>CC</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Claimant</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Service</u></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {last6Referrals?.map((row, j) => {

                                    return (
                                        <TableRow
                                        onClick={() => handleClick(row.referralId)}
                                        hover
                                        key={row.referralId}
                                        sx={{ backgroundColor: '#E0ACF5'}}
                                        >
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