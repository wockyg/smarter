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

import useUpdateFceppdBilling from '../hooks/useUpdateFceppdBilling';

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import useGetFceppdBilling from '../hooks/useGetFceppdBilling';

import { useParams } from 'react-router-dom';

export default function FceBilling(props) {

    let { id: linkId } = useParams();

    const [currentEditRow, setCurrentEditRow] = useState({});
    const [revertData, setRevertData] = useState({});
    const [currentlyEditing, setCurrentlyEditing] = useState(false);

    const { status: statusRow, data: row, error: errorRow, isFetching: isFetchingRow } = useGetFceppdBilling(+linkId);

    const mutationUpdate = useUpdateFceppdBilling();

    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    })

    const startEditing = () => {
        console.log("start editing");
        setRevertData(row);
        setCurrentEditRow(row);
        setCurrentlyEditing(true);
    }

    const stopEditing = () => {
        console.log("done editing");
        const keys = Object.keys(row);
        const changedKeys = keys.filter(index => row[index] !== currentEditRow[index]);
        const values = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: currentEditRow[key] }), {});
        // values.fceId = row.fceId;
        values.referralId = row.referralId;
        console.log(values);
        Object.keys(values).length > 2 && mutationUpdate.mutate(values);
        setCurrentlyEditing(false);
        setRevertData({});
        setCurrentEditRow({});
    }

    const cancelEdit = () => {
        console.log("cancel edit");
        setCurrentlyEditing(false);
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
    {row && 
    <TableContainer component={Paper}>
        <Table stickyHeader size="small" aria-label="fceBilling table">
            <TableHead>
                <TableRow>
                    <TableCell sx={{ fontSize: 12 }}><u>Report</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>V1500</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>D1500</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Format</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>AdjRate</u></TableCell>
                    <TableCell sx={{ fontSize: 12 }}><u>Adjustment</u></TableCell>
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

                <TableRow key={row.billingId}>

                    {/* Report */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>{row.reportReceivedDate}</TableCell>

                    {/* V1500 */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                        {currentlyEditing ?
                            <input 
                            type="date" 
                            name="v1500"
                            value={currentEditRow.v1500 ? currentEditRow.v1500 : ''}
                            onChange={(event) => handleChangeEdit(event, 'v1500')}
                            style={{width: '13ch'}}
                        />
                        : row.v1500 && row.v1500}
                    </TableCell>

                    {/* D1500 */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                        {currentlyEditing ?
                        <input 
                            type="date" 
                            name="d1500"
                            value={currentEditRow.d1500 ? currentEditRow.d1500 : ''}
                            onChange={(event) => handleChangeEdit(event, 'd1500')}
                            style={{width: '13ch'}}
                        />
                        : row.d1500 && row.d1500}
                    </TableCell>

                    {/* D1500 Format */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                        {currentlyEditing ?
                        <select
                        onChange={(event) => handleChangeEdit(event, 'd1500Format')}
                        value={currentEditRow.d1500SendFormat ? currentEditRow.d1500SendFormat : ""}
                        name="d1500Format"
                        >
                            <option value={row.d1500SendFormat ? row.d1500SendFormat : ""}>{row.d1500SendFormat ? row.d1500SendFormat : ""}</option>
                            {['Email', 'Fax', 'Mail'].filter((x) => x !== row.d1500SendFormat).map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                        : row.d1500SendFormat}
                    </TableCell>
                                
                    {/* Adj Rate */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                        {+row.adjusterRate + +row.adjusterRateAdjustment}
                    </TableCell>

                    {/* Adj Rate Adjustment */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                        {currentlyEditing ?
                        <input 
                            type="text" 
                            name="adjusterRateAdjustment"
                            value={currentEditRow.adjusterRateAdjustment ? currentEditRow.adjusterRateAdjustment : ''}
                            onChange={(event) => handleChangeEdit(event, 'adjusterRateAdjustment')}
                            style={{width: '8ch'}}
                        />
                        : row.adjusterRateAdjustment}
                    </TableCell>
                    
                    {/* Adj Date Due */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px', backgroundColor: row.adjusterPastDueFormula === 'Yes' && '#F5B7B1'  }}>
                        {row.adjusterDateDueFormulaFormat}
                    </TableCell>

                    {/* Payment Status */}
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

                    {/* Payment Status Date */}
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

                    {/* Date Rebilled */}
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

                    {/* Rebill Format */}
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
                                
                    {/* Adj Date Paid */}
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

                    {/* Adj Amt Paid */}
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

                    {/* PT Rate */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>{row.facilityRate}</TableCell>

                    {/* PT Date Due */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px', backgroundColor: row.facilityPastDueFormula === 'Yes' && '#F5B7B1' }}>
                        {row.facilityDateDueFormulaFormat}
                    </TableCell>

                    {/* PT Date Paid */}
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

                    {/* PT Amt Paid */}
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

                    {/* Check Number */}
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

                    {/* Revenue */}
                    <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>{row.revenue}</TableCell>

                    {/* Write-Off */}
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
                                    onClick={() => stopEditing()}
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
                                onClick={() => startEditing()}
                                />
                                </Grid>}
                            </Grid>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
    }
    </>);
}