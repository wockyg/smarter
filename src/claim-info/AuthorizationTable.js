import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from '@mui/material/Grid';

import { visitNumbers } from '../lookup-tables/lookup_visitNumbers';

import useGetReferralAuth from '../hooks/useGetReferralAuth';
import useAddReferralAuth from '../hooks/useAddReferralAuth';
import useGetReferral from '../hooks/useGetReferral';

import { useParams } from 'react-router-dom';

export default function AuthorizationTable(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    // const selectedClaim = referrals.length > 0 && referrals.filter((row) => row.referralId === +linkId)[0];

    const { status: statusAuth, data: auth, error: errorAuth, isFetching: isFetchingAuth } = useGetReferralAuth(linkId);

    const [newAuth, setNewAuth] = useState({});

    const mutationUpdate = useAddReferralAuth(); 

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
            return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleChangeAuth = (e, key) => {
        setNewAuth({...newAuth, [key]: e.target.value});
    }

    const handleAddAuth = () => {
        const a = {...newAuth, referralId: selectedClaim?.referralId};
        if (a.approvedVisits && a.referralId) {
            mutationUpdate.mutate(a);
        }
    }


    return (
        <>
        {selectedClaim?.referralId && auth?.length > 0 &&
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <TableContainer component={Paper}>
                        <Table size="small" >
                            <TableBody>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>

                                    <select 
                                    name="approvedVisits" 
                                    value={newAuth?.approvedVisits ? newAuth.approvedVisits : ""} 
                                    onChange={(event) => handleChangeAuth(event, 'approvedVisits')}
                                    >
                                        <option value="">--</option>
                                        {visitNumbers.map((n) => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                    <AddBoxIcon sx={{cursor: "pointer"}} onClick={() => handleAddAuth()} />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TableContainer component={Paper} sx={{border: 1, height: 200}}>
                        <Table size="small" aria-label="dptAuthorization table">
                        <TableBody>
                            {stableSort(auth, getComparator('asc', 'authId')).map((row, i) => (
                            <TableRow key={row.authId}>
                                <TableCell sx={{border: 1}} align="left">{i+1}</TableCell>
                                <TableCell sx={{border: 1}} align="left">{row.approvedVisits}</TableCell>
                                {/* <TableCell sx={{border: 1}} align="left">{row.dateAdded}</TableCell> */}
                                <TableCell align="left">
                                <button 
                                onClick={() => {
                                    // mutationDelete.mutate({ noteId: `${row.billingId}` });
                                }}
                                variant="outlined">x</button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
        }
        </>);
}