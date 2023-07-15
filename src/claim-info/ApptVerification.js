import { useState, useRef, useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';
import Grid from '@mui/material/Grid';

import {times} from '../lookup-tables/lookup_times'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import useUpdateVisit from '../hooks/useUpdateVisit';
import useGetReferralVisits from '../hooks/useGetReferralVisits';
import useGetReferralAuth from '../hooks/useGetReferralAuth';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import emailjs from '@emailjs/browser';

import { useParams } from 'react-router-dom';

import '../App.css';

export default function ApptVerification(props) {

    let { id: linkId } = useParams();

    const [editIDx, setEditIDx] = useState(-1);
    const [revertData, setRevertData] = useState({});
    const [currentEditRow, setCurrentEditRow] = useState({});

    const [needPNvalue, setNeedPNValue] = useState(Boolean(currentEditRow?.needPN));

    // console.log(needPNvalue);

    let prevAttend = "";
    let visitNum = 0;
    let authNum = 0;

    const mutationUpdate = useUpdateVisit();

    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetReferralVisits(linkId);
    const { status: statusAuth, data: auth, error: errorAuth, isFetching: isFetchingAuth } = useGetReferralAuth(linkId);

    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    })

    const startEditing = (i, row) => {
        console.log("start editing");
        // console.log(row);
        setEditIDx(i);
        setRevertData(row);
        setCurrentEditRow(row);
    }

    const handleRemove = (i) => {
        console.log("delete");
        //submit delete request
    }

    const stopEditing = (row) => {
        console.log("done editing");
        const keys = Object.keys(row);
        const changedKeys = keys.filter(index => row[index] !== currentEditRow[index]);
        const values = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: currentEditRow[key] }), {});
        values.billingId = row.billingId;
        values.referralId = row.referralId;
        values.assign = row.assign;
        console.log(values);
        Object.keys(values).length > 3 && mutationUpdate.mutate(values);
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    }

    const cancelEdit = () => {
        console.log("cancel edit");
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    }

    const handleChangeEdit = (event, key) => {
        let newRow;
        if (key === "needPN") {
            setNeedPNValue(!needPNvalue);
            newRow = {...currentEditRow, needPN: needPNvalue === false ? null : "Need PN"};
            // console.log(newRow);
        }
        else {
            newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value};
        }
        setCurrentEditRow(newRow);
        // console.log(key, newRow[key]);
        // TODO: debud needPN
        // console.log(event.target.value);
    }

    return (
        <>
        <TableContainer component={Paper}>
            <Table stickyHeader size="small" aria-label="apptVerification table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontSize: 12 }}><u>Auth #</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Visit #</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>DOS</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Time</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Attend</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Type</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Notes Received</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>V1500</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>DOS Notes</u></TableCell>
                        <TableCell sx={{ fontSize: 12 }}><u>Need PN</u></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {visits && auth && visits.sort((a, b) => {
                                        if (a.dos === null){
                                            return 1;
                                        }
                                        if (b.dos === null){
                                            return -1;
                                        }
                                        if (a.dos === b.dos){
                                            return 0;
                                        }
                                        return a.dos < b.dos ? -1 : 1;
                                    })
                                    .map((row, j) => {

                                    if(prevAttend !== "No"){
                                        visitNum = visitNum + 1;
                                    }
                                    let au = auth && auth[authNum].approvedVisits;
                                    if (visitNum > au){
                                        visitNum = 1;
                                        authNum = authNum + 1;
                                    }
                                    au = auth && auth[authNum]?.approvedVisits;
                                    prevAttend = row.attend;

                                    const currentlyEditing = editIDx === j;



                                    return (
                                        <TableRow
                                            key={row.billingId}
                                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            sx={{ backgroundColor: visitNum === 1 ? "#FFFACD" : (row.needPN === "Need PN" ? "#58D68D" : "white")}}
                                        >
                                            <StyledTableCell sx={{ borderRight: 1 }}>{authNum+1}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{visitNum+" of "+au}</StyledTableCell>
                                            {currentlyEditing ? 
                                            <>
                                            {/* dos */}
                                            <StyledTableCell sx={{ borderRight: 1 }}>
                                                <input 
                                                    type="date" 
                                                    name="dos"
                                                    value={currentEditRow.dos ? currentEditRow.dos : ''}
                                                    onChange={(event) => handleChangeEdit(event, 'dos')}
                                                >
                                                </input>
                                            </StyledTableCell>

                                            {/* dosTime */}
                                            <StyledTableCell sx={{ borderRight: 1 }}>
                                                <select
                                                    onChange={(event) => handleChangeEdit(event, 'dosTime')}
                                                    value={currentEditRow.dosTime ? currentEditRow.dosTime : ''}
                                                    name="dosTime"
                                                >
                                                <option value={row.dosTime ? row.dosTime : ""}>{row.dosTime ? row.dosTime : "---"}</option>
                                                    {times.filter((x) => x.Time !== row.dosTime).map((n) => (
                                                        <option key={n.Time} value={n.Time}>{n.Time}</option>
                                                    ))}
                                                </select>
                                            </StyledTableCell>

                                            {/* attend */}
                                            <StyledTableCell sx={{ borderRight: 1 }}>
                                                <select
                                                    onChange={(event) => handleChangeEdit(event, 'attend')}
                                                    value={currentEditRow.attend ? currentEditRow.attend : ""}
                                                    name="attend"
                                                >
                                                <option value={row.attend ? row.attend : ""}>{row.attend ? row.attend : "---"}</option>
                                                    {['Yes', 'No'].filter((x) => x !== row.attend).map((n) => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                            </StyledTableCell>

                                            {row.attend === "Yes" ?
                                            <>
                                            {/* serviceType */}
                                            <StyledTableCell sx={{ borderRight: 1 }}>
                                                 <select
                                                    onChange={(event) => handleChangeEdit(event, 'serviceType')}
                                                    value={currentEditRow.serviceType ? currentEditRow.serviceType : ""}
                                                    name="serviceType"
                                                >
                                                <option value={row.serviceType ? row.serviceType : ""}>{row.serviceType ? row.serviceType : "---"}</option>
                                                    {['', 'Daily', 'InitialEval', 'Combined', 'Re-Eval', 'WC (2hr.)', 'WC (3hr.)', 'WH (2hr.)', 'WH (3hr.)'].filter((x) => x !== row.serviceType).map((n) => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                            </StyledTableCell>
                                            </>
                                            :
                                            <>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.serviceType}</StyledTableCell>
                                            </>
                                            }

                                            {row.attend === "Yes" ?
                                            <>
                                            {/* notesReceived */}
                                            <StyledTableCell sx={{ borderRight: 1 }}>
                                                <select
                                                    onChange={(event) => handleChangeEdit(event, 'notesReceived')}
                                                    value={currentEditRow.notesReceived ? currentEditRow.notesReceived : ""}
                                                    name="notesReceived"
                                                >
                                                <option value={row.notesReceived ? row.notesReceived : ""}>{row.notesReceived ? row.notesReceived : "---"}</option>
                                                    {['', 'Daily', 'InitialEval', 'Re-Eval', 'Progress', 'Discharge'].filter((x) => x !== row.notesReceived).map((n) => (
                                                        <option key={n} value={n}>{n}</option>
                                                    ))}
                                                </select>
                                            </StyledTableCell>
                                            </>
                                            :
                                            <>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.notesReceived}</StyledTableCell>
                                            </>
                                            }

                                            {row.attend === "Yes" ?
                                            <>
                                            {/* v1500 */}
                                            <StyledTableCell sx={{ borderRight: 1 }}>
                                                <input 
                                                    type="date" 
                                                    name="v1500"
                                                    value={currentEditRow.v1500 ? currentEditRow.v1500 : ''}
                                                    onChange={(event) => handleChangeEdit(event, 'v1500')}
                                                />
                                            </StyledTableCell>
                                            </>
                                            :
                                            <>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.v1500 && row.v1500Format}</StyledTableCell>
                                            </>
                                            }

                                            {/* dosNotes */}
                                            <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                                <textarea
                                                    name="dosNotes"
                                                    value={currentEditRow.dosNotes ? currentEditRow.dosNotes : ''}
                                                    onChange={(event) => handleChangeEdit(event, 'dosNotes')}
                                                />
                                            </TableCell>

                                            {/* needPN */}
                                            <StyledTableCell sx={{ borderRight: 1 }}>
                                                <input 
                                                    type="checkbox"
                                                    id="needPN-checkbox"
                                                    name="needPN"
                                                    value={currentEditRow.needPN ? true : false}
                                                    checked={currentEditRow.needPN ? true : false}
                                                    onChange={(event) => handleChangeEdit(event, 'needPN')}
                                                />
                                            </StyledTableCell>

                                            {/* buttons */}
                                            <StyledTableCell>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <CheckIcon
                                                        sx={{cursor: "pointer"}}
                                                        fontSize='small'
                                                        onClick={() => stopEditing(row)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <ClearIcon
                                                        sx={{cursor: "pointer"}}
                                                        fontSize='small'
                                                        onClick={() => cancelEdit()}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            </> 
                                            : 
                                            <>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.dos && row.dosFormat}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.dosTime}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.attend}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.serviceType}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.notesReceived}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.v1500 && row.v1500Format}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.dosNotes}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{row.needPN}</StyledTableCell>
                                            <StyledTableCell>
                                                <Grid container>
                                                    <Grid item xs={6}>
                                                        <EditIcon
                                                        sx={{cursor: "pointer"}}
                                                        fontSize='small'
                                                        onClick={() => startEditing(j, row)}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        {!au &&
                                                        <>
                                                        <DeleteIcon
                                                        sx={{cursor: "pointer"}}
                                                        fontSize='small'
                                                        onClick={() => handleRemove(j)}
                                                        />
                                                        </>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </StyledTableCell>
                                            </>}
                                        </TableRow>
                                    )}
                    )}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
}