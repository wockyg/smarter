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

import useGetReferralsCalendar from '../hooks/useGetReferralsCalendar';

import { useNavigate } from "react-router-dom";

import { states } from '../lookup-tables/lookup_UsState';

import '../App.css';

import { ref } from 'yup';

const months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];

export default function ReferralsByMonth(props) {

    const [year, setYear] = useState(new Date().getFullYear());

    let years = [];
    const currentYear = new Date().getFullYear();
    let startYear = 2019;
    while ( startYear <= currentYear ) {
        years.push(startYear++);
    }

    const { status: statusRows, data: referrals, error: errorRows, isFetching: isFetchingRows } = useGetReferralsCalendar();



    const referralsFiltered = referrals?.filter(r => new Date(r.referralDate).getFullYear() === +year);

    // referrals && console.log(year, referralsFiltered);


    const handleEventClick = (event) => {
        console.log("Event click");
        const newId = event.event._def.extendedProps.referralId;
        console.log(newId);
    };

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    });

    return(
        <Box sx={{background: '#FFFFFF'}}>
            <label htmlFor="referralYear" style={{display: 'block'}}>Year:</label>
            <select
            id='referralYear'
            name='referralYear'
            onChange={(event) => handleChangeYear(event)}
            value={year}
            style={{display: 'block'}}
            >
                {years.map(r => {return (<option value={r}>{r}</option>)})}
            </select>
            <TableContainer
            component={Paper}
            // sx={{ height: 350 }}
            >
                <Table stickyHeader size="small" aria-label="referralsByCC table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: 12 }}><u>Month</u></TableCell>
                            {/* <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>Month</u></TableCell> */}
                            <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>DPT</u></TableCell>
                            <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>FCE|PPD</u></TableCell>
                            <TableCell sx={{ fontSize: 12, padding: 0.5 }}><u>Total</u></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {months.map((row, j) => {

                                        const monthReferrals = referralsFiltered?.filter(r => new Date(r.referralDate).getMonth() === j);

                                        // console.log(referralsFiltered);

                                        const monthReferralsDpt = monthReferrals?.filter(r => r.service.includes('DPT'));

                                        const monthReferralsFce = monthReferrals?.filter(r => r.service.includes('FCE') || r.service.includes('PPD'));

                                        const monthReferralsCount = monthReferrals?.length;

                                        const monthReferralsDptCount = monthReferralsDpt?.length;

                                        const monthReferralsFceCount = monthReferralsFce?.length;

                                        // let total_charges = 0.0;

                                        // let total_units = 0;

                                        // row.rowData?.forEach((row) => {
                                        //     total_charges = total_charges + (+row.charges);
                                        //     total_units = total_units + (+row.units);
                                        // })

                                        // total_charges = (Math.round(total_charges * 100) / 100).toFixed(2);

                                        return (
                                            <TableRow
                                            // hover
                                            key={row}
                                            sx={{ backgroundColor: '#E0ACF5'}}
                                            >
                                                <StyledTableCell
                                                // sx={{ fontSize: 13, maxWidth: 100, whiteSpace: 'nowrap' }}
                                                >
                                                    <u><strong>{`${row}, ${year}`}</strong></u>
                                                </StyledTableCell>
                                                <StyledTableCell>{monthReferralsDptCount}</StyledTableCell>
                                                <StyledTableCell>{monthReferralsFceCount}</StyledTableCell>
                                                <StyledTableCell>{monthReferralsCount}</StyledTableCell>
                                            </TableRow>
                                        )}
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}