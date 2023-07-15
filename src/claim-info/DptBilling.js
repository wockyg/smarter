import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';
import Grid from '@mui/material/Grid';

import useGetReferralVisits from '../hooks/useGetReferralVisits';
import useGetReferralAuth from '../hooks/useGetReferralAuth';
import useUpdateVisit from '../hooks/useUpdateVisit';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { useParams } from 'react-router-dom';

export default function DptBilling(props) {

    let { id: linkId } = useParams();

    const [editIDx, setEditIDx] = useState(-1);
    const [currentEditRow, setCurrentEditRow] = useState({});
    const [revertData, setRevertData] = useState({});

    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetReferralVisits(linkId);
    const { status: statusAuth, data: auth, error: errorAuth, isFetching: isFetchingAuth } = useGetReferralAuth(linkId);

    const mutationUpdate = useUpdateVisit();

    const totalAuthVisits = auth?.length > 0 && auth.map((a) => a.approvedVisits).reduce((partial, t) => partial + t, 0);

    const visitCountPaid = visits?.length > 0 && visits.filter((v) => v.adjusterAmountPaid !== null && v.facilityAmountPaid !== null).length;

    let visitNum = 0;

    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    })

    const startEditing = (i, row) => {
        console.log("start editing");
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
        // values.dos = currentEditRow.dos;
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
        const newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value};
        setCurrentEditRow(newRow);
        // console.log(event.target.value);
    }

    return(
    <>
    <TableContainer component={Paper}>
        <Table stickyHeader size="small" aria-label="dptBilling table">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontSize: 12 }}><u>Visit #</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>DOS</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Type</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>V1500</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>D1500</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Format</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>AdjRate</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>AdjDue</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>PmtStatus</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>PmtStatusDate</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>RebillDate</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Format</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>AdjPaid</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Amt</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>PTRate</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>PTDue</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>PTPaid</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Amt</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Check#</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Revenue</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Write-Off</u></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {visits && auth && visits.filter((r) => r.attend === "Yes").sort((a, b) => {
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
                                visitNum = visitNum + 1;
                                const currentlyEditing = editIDx === j;
                                return (
                                    <TableRow
                                        key={row.billingId}
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        // sx={{ backgroundColor: visitNum === 1 ? "#FFFACD" : "white"}}
                                    >
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>{visitNum+" of "+totalAuthVisits}</TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>{row.dos && row.dosFormat}</TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
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
                                            : row.serviceType}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                             <input 
                                                type="date" 
                                                name="v1500"
                                                value={currentEditRow.v1500 ? currentEditRow.v1500 : ''}
                                                onChange={(event) => handleChangeEdit(event, 'v1500')}
                                                style={{width: '13ch'}}
                                            />
                                            : row.v1500 && row.v1500Format}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="date" 
                                                name="d1500Sent"
                                                value={currentEditRow.d1500Sent ? currentEditRow.d1500Sent : ''}
                                                onChange={(event) => handleChangeEdit(event, 'd1500Sent')}
                                                style={{width: '13ch'}}
                                            />
                                            : row.d1500Sent && row.d1500SentFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <select
                                            onChange={(event) => handleChangeEdit(event, 'd1500SendFormat')}
                                            value={currentEditRow.d1500SendFormat ? currentEditRow.d1500SendFormat : ""}
                                            name="d1500SendFormat"
                                            >
                                                <option value={row.d1500SendFormat ? row.d1500SendFormat : ""}>{row.d1500SendFormat ? row.d1500SendFormat : ""}</option>
                                                {['Email', 'Fax', 'Mail'].filter((x) => x !== row.d1500SendFormat).map((n) => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                            : row.d1500SendFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="text" 
                                                name="adjusterRate"
                                                value={currentEditRow.adjusterRate ? currentEditRow.adjusterRate : ''}
                                                onChange={(event) => handleChangeEdit(event, 'adjusterRate')}
                                                style={{width: '8ch'}}
                                            />
                                            : row.adjusterRate}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px', backgroundColor: row.adjusterPastDueFormula === 'Yes' && '#F5B7B1'  }}>
                                            {row.adjusterDateDueFormulaFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <select
                                            onChange={(event) => handleChangeEdit(event, 'paymentStatus')}
                                            value={currentEditRow.paymentStatus ? currentEditRow.paymentStatus : ""}
                                            name="paymentStatus"
                                            >
                                                <option value={row.paymentStatus ? row.paymentStatus : ""}>{row.paymentStatus ? row.paymentStatus : ""}</option>
                                                {['NOF', 'IP', 'DEN', 'SP', 'DNC'].filter((x) => x !== row.paymentStatus).map((n) => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                            : row.paymentStatus}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="date" 
                                                name="paymentStatusDate"
                                                value={currentEditRow.paymentStatusDate ? currentEditRow.paymentStatusDate : ''}
                                                onChange={(event) => handleChangeEdit(event, 'paymentStatusDate')}
                                                style={{width: '13ch'}}
                                            />
                                            : row.paymentStatusDate && row.paymentStatusDateFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="date" 
                                                name="dateRebilled"
                                                value={currentEditRow.dateRebilled ? currentEditRow.dateRebilled : ''}
                                                onChange={(event) => handleChangeEdit(event, 'dateRebilled')}
                                                style={{width: '13ch'}}
                                            />
                                            : row.dateRebilled && row.dateRebilledFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <select
                                            onChange={(event) => handleChangeEdit(event, 'rebillFormat')}
                                            value={currentEditRow.rebillFormat ? currentEditRow.rebillFormat : ""}
                                            name="rebillFormat"
                                            >
                                                <option value={row.rebillFormat ? row.rebillFormat : ""}>{row.rebillFormat ? row.rebillFormat : ""}</option>
                                                {['Email', 'Fax', 'Mail'].filter((x) => x !== row.rebillFormat).map((n) => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                            : row.rebillFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="date" 
                                                name="adjusterDatePaid"
                                                value={currentEditRow.adjusterDatePaid ? currentEditRow.adjusterDatePaid : ''}
                                                onChange={(event) => handleChangeEdit(event, 'adjusterDatePaid')}
                                                style={{width: '13ch'}}
                                            />
                                            : row.adjusterDatePaid && row.adjusterDatePaidFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="text" 
                                                name="adjusterAmountPaid"
                                                value={currentEditRow.adjusterAmountPaid ? currentEditRow.adjusterAmountPaid : ''}
                                                onChange={(event) => handleChangeEdit(event, 'adjusterAmountPaid')}
                                                style={{width: '8ch'}}
                                            />
                                            : row.adjusterAmountPaid}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>{row.facilityRate}</TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px', backgroundColor: row.facilityPastDueFormula === 'Yes' && '#F5B7B1' }}>
                                            {row.facilityDateDueFormulaFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="date" 
                                                name="facilityDatePaid"
                                                value={currentEditRow.facilityDatePaid ? currentEditRow.facilityDatePaid : ''}
                                                onChange={(event) => handleChangeEdit(event, 'facilityDatePaid')}
                                                style={{width: '13ch'}}
                                            />
                                            : row.facilityDatePaid && row.facilityDatePaidFormat}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="text" 
                                                name="facilityAmountPaid"
                                                value={currentEditRow.facilityAmountPaid ? currentEditRow.facilityAmountPaid : ''}
                                                onChange={(event) => handleChangeEdit(event, 'facilityAmountPaid')}
                                                style={{width: '8ch'}}
                                            />
                                            : row.facilityAmountPaid}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="text" 
                                                name="checkNumber"
                                                value={currentEditRow.checkNumber ? currentEditRow.checkNumber : ''}
                                                onChange={(event) => handleChangeEdit(event, 'checkNumber')}
                                                style={{width: '6ch'}}
                                            />
                                            : row.checkNumber}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>{row.revenue}</TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {currentlyEditing ?
                                            <input 
                                                type="checkbox"
                                                name="writeOff"
                                                value="Write-Off"
                                                onChange={(event) => handleChangeEdit(event, 'writeOff')}
                                            />
                                            : row.writeOff}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <Grid container>
                                                    {currentlyEditing ?
                                                    <>
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
                                                    </>
                                                    :
                                                    <Grid item xs={12}>
                                                    <EditIcon
                                                    sx={{cursor: "pointer"}}
                                                    fontSize='small'
                                                    onClick={() => startEditing(j, row)}
                                                    />
                                                    </Grid>}
                                                </Grid>
                                        </TableCell>
                                    </TableRow>
                                )}
                )}
            </TableBody>
        </Table>
    </TableContainer>
    </>);
}