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
import DehazeIcon from '@mui/icons-material/Dehaze';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import { serviceTypes } from '../lookup-tables/lookup_serviceTypes';
import { notesReceived } from '../lookup-tables/lookup_notesReceived';
import { status } from '../lookup-tables/lookup_paymentStatus';

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
    const [currentBulkEdit, setCurrentBulkEdit] = useState({});

    const [selected, setSelected] = useState([]);
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const [enabled, setEnabled] = useState({});

    const [gridEditId, setGridEditId] = useState(null);
    const [gridEditKey, setGridEditKey] = useState(null);
    const [gridEditVal, setGridEditVal] = useState(null);
    const [gridEditOgVal, setGridEditOgVal] = useState(null);
    const [gridEditType, setGridEditType] = useState(null);
    const [gridEditOptions, setGridEditOptions] = useState(null);
    const [gridCheckboxChecked, setGridCheckboxChecked] = useState(Boolean(gridEditVal));

    const [menuType, setMenuType] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [writeOffValue, setWriteOffValue] = useState(Boolean(currentEditRow?.writeOff));

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

    const style = {
        position: 'absolute',
        // marginTop: '100px',
        // marginLeft: '400px',
        // marginRight: '400px',
        bottom: '20%',
        left: '35%',
        overflowY: 'scroll',
        // transform: 'translate(-20%, -20%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxHeight: 900,
    };

    const startEditing = (i, row) => {
        console.log("start editing row:");
        console.log(row);
        setEditIDx(i);
        setRevertData(row);
        setCurrentEditRow(row);
    };

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
    };

    const cancelEdit = () => {
        console.log("cancel edit");
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    };

    const handleChangeEdit = (event, key) => {

        let newRow = {};

        if (key === "writeOff") {
            setWriteOffValue(!writeOffValue);
            newRow = {...currentEditRow, writeOff: writeOffValue === false ? null : "Yes"};
            // console.log(newRow);
        }
        else {
            newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value};
        }
        
        setCurrentEditRow(newRow);
        // console.log(currentEditRow[key]);
        // console.log(event.target.value);
    };

    const handleStartBulkEdit = () => {
        console.log('BULK');
        // open modal
        setBulkModalOpen(true);
        
    };

    const handleBulkSubmit = () => {
        // submit data
        console.log('SUBMIT THE BULKS');
        console.log(currentBulkEdit);

        const keys = Object.keys(currentBulkEdit);
        const changedKeys = keys.filter(index => currentBulkEdit[index] !== -1);
        const values = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: currentBulkEdit[key] }), {});

        if (Object.keys(values).length > 0) {
            console.log(values);
            selected.forEach((billingId, i) => {
                mutationUpdate.mutate({...values, billingId: billingId});
            });
        }
        else {
            console.log("nothing to update...")
        }
        // reset selected
        setSelected([]);
        // reset enabled
        setEnabled({});
        // reset BulkEdit Fields
        setCurrentBulkEdit({});
        
        // close modal
        handleModalClose();
        
    };

    const handleEnableBulkField = (event, field) => {

        setEnabled({...enabled, [field]: !enabled[field]});

        if (!enabled[field]) {
            setCurrentBulkEdit({...currentBulkEdit, [field]: null})
        }
        else if (enabled[field]) {
            setCurrentBulkEdit({...currentBulkEdit, [field]: -1})
        }
    };

    const handleChangeBulkEdit = (event, key) => {
        let newValues = {};
        if (key === "writeOff") {
            newValues = {...currentBulkEdit, writeOff: event.target.value === false ? null : "Yes"}
        }
        else {
            newValues = {...currentBulkEdit, [key]: event.target.value === '' ? null : event.target.value};
        }
        setCurrentBulkEdit(newValues);
        console.log(newValues?.writeOff);
    };

    const handleModalClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setBulkModalOpen(false);
            setEnabled({});
        }
    };

    const handleClickBox = (event, billingId) => {
        const selectedIndex = selected.indexOf(billingId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, billingId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);

        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});

        // console.log(selected);
    };

    const handleClearSelected = () => {
        console.log('CLEAR SELECTION');
        setSelected([]);      
        
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelected = visits?.filter((r) => r.attend === "Yes").map((v) => v.billingId);
        setSelected(newSelected);
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
        return;
        }
        setSelected([]);
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    };

    const handleOpenGrid = (event, row, key, type, options) => {
        
        // TODO validate grid edit request: is it allowed?

        console.log('Open Grid edit');
        setAnchorEl(event.currentTarget);
        // console.log(event.currentTarget);
        setMenuType('grid');
        setGridEditId(row.billingId)
        setGridEditKey(key);
        setGridEditVal(row[key]);
        setGridEditType(type);
        setGridEditOgVal(row[key]);
        type === 'select' && setGridEditOptions(options)
        type === 'checkbox' && setGridCheckboxChecked(Boolean(row[key]))
    };

    const handleChangeGridEdit = (event) => {
        let newVal;
        if (gridEditType === "checkbox") {
            newVal = gridEditVal ? null : "Yes";
            setGridCheckboxChecked(Boolean(newVal))
        }
        else {
            newVal = event.target.value === '' ? null : event.target.value;
        }
        setGridEditVal(newVal)
    }

    const handleGridSubmit = () => {

        console.log('SUBMIT THE GRID');
        console.log(gridEditKey, ": ", gridEditVal);

        if (gridEditVal === gridEditOgVal) {
            // value did not change, don't update db
            console.log("nothing to update...")
            handleCloseMenu();
            return;
        }

        // update row in db
        mutationUpdate.mutate({billingId: gridEditId, [gridEditKey]: gridEditVal});
        handleCloseMenu();

    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setMenuType(null);
        setGridEditVal(null);
        setGridEditOgVal(null);
        setGridEditType(null);
        setGridEditOptions(null)
        setGridEditId(null)
        // setGridCheckboxChecked(Boolean(gridEditVal))
    };

    const isSelected = (billingId) => selected.indexOf(billingId) !== -1;

     // extract into reusable file
    function EnhancedTableToolbar(props) {
        const { numSelected } = props;

        return (
            <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
            >
            {numSelected > 0 ? (
                <Tooltip title="Bulk Edit">
                <IconButton onClick={handleStartBulkEdit}>
                    <DehazeIcon /><EditIcon />
                </IconButton>
                </Tooltip>
            ) : ('')}

            {numSelected > 0 ? (
                <Typography
                sx={{ flex: '1 1 100%' }}
                color="inherit"
                variant="subtitle1"
                component="div"
                >
                {numSelected} selected
                </Typography>
            ) : ('')}

            {numSelected > 0 ? (
                <Tooltip title="Clear Selection">
                <IconButton onClick={handleClearSelected}>
                    <HighlightOffIcon />
                </IconButton>
                </Tooltip>
            ) : ('')}
            </Toolbar>
        );
    }
    // extract into reusable file
    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    return(
    <>
    <EnhancedTableToolbar numSelected={selected.length} />
    
    <TableContainer component={Paper} sx={{ height: 500 }}>
        <Table stickyHeader size="small" aria-label="dptBilling table">
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={selected?.length > 0 && selected?.length < visits?.filter((r) => r.attend === "Yes").length}
                            checked={selected?.length > 0 && selected?.length === visits?.filter((r) => r.attend === "Yes").length}
                            onChange={handleSelectAllClick}
                            inputProps={{
                            'aria-label': 'select all visitsB',
                            }}
                        />
                    </TableCell>
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
                    <TableCell sx={{ fontSize: 12 }}></TableCell>
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
                                const isItemSelected = isSelected(row.billingId);
                                return (
                                    <TableRow
                                        hover
                                        selected={isItemSelected}
                                        key={row.billingId}
                                        // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        // sx={{ backgroundColor: visitNum === 1 ? "#FFFACD" : "white"}}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                onClick={(event) => handleClickBox(event, row.billingId)}
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                'aria-labelledby': 'editBoxB',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {visitNum+" of "+totalAuthVisits}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {row.dos && row.dos}
                                        </TableCell>

                                        {currentlyEditing ?
                                        <>
                                        {/* row.serviceType */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
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
                                        </TableCell>

                                        {/* row.v1500 */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                             <input 
                                                type="date" 
                                                name="v1500"
                                                value={currentEditRow.v1500 ? currentEditRow.v1500 : ''}
                                                onChange={(event) => handleChangeEdit(event, 'v1500')}
                                                style={{width: '13ch'}}
                                            />
                                        </TableCell>

                                        {/* row.d1500Sent */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="date" 
                                                name="d1500Sent"
                                                value={currentEditRow.d1500Sent ? currentEditRow.d1500Sent : ''}
                                                onChange={(event) => handleChangeEdit(event, 'd1500Sent')}
                                                style={{width: '13ch'}}
                                            />
                                        </TableCell>

                                        {/* row.d1500SendFormat */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
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
                                        </TableCell>

                                        {/* row.adjusterRate */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="text" 
                                                name="adjusterRate"
                                                value={currentEditRow.adjusterRate ? currentEditRow.adjusterRate : ''}
                                                onChange={(event) => handleChangeEdit(event, 'adjusterRate')}
                                                style={{width: '8ch'}}
                                            />
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px', backgroundColor: row.adjusterPastDueFormula === 'Yes' && '#F5B7B1'  }}>
                                            {row.adjusterDateDueFormula}
                                        </TableCell>

                                        {/* row.paymentStatus */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
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
                                        </TableCell>

                                        {/* row.paymentStatusDate */}
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

                                        {/* row.dateRebilled */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="date" 
                                                name="dateRebilled"
                                                value={currentEditRow.dateRebilled ? currentEditRow.dateRebilled : ''}
                                                onChange={(event) => handleChangeEdit(event, 'dateRebilled')}
                                                style={{width: '13ch'}}
                                            />
                                        </TableCell>

                                        {/* row.rebillFormat */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
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
                                        </TableCell>

                                        {/* row.adjusterDatePaid */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="date" 
                                                name="adjusterDatePaid"
                                                value={currentEditRow.adjusterDatePaid ? currentEditRow.adjusterDatePaid : ''}
                                                onChange={(event) => handleChangeEdit(event, 'adjusterDatePaid')}
                                                style={{width: '13ch'}}
                                            />
                                        </TableCell>

                                        {/* row.adjusterAmountPaid */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="text" 
                                                name="adjusterAmountPaid"
                                                value={currentEditRow.adjusterAmountPaid ? currentEditRow.adjusterAmountPaid : ''}
                                                onChange={(event) => handleChangeEdit(event, 'adjusterAmountPaid')}
                                                style={{width: '8ch'}}
                                            />
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {row.facilityRate}
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px', backgroundColor: row.facilityPastDueFormula === 'Yes' && '#F5B7B1' }}>
                                            {row.facilityDateDueFormula}
                                        </TableCell>

                                        {/* row.facilityDatePaid */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="date" 
                                                name="facilityDatePaid"
                                                value={currentEditRow.facilityDatePaid ? currentEditRow.facilityDatePaid : ''}
                                                onChange={(event) => handleChangeEdit(event, 'facilityDatePaid')}
                                                style={{width: '13ch'}}
                                            />
                                        </TableCell>

                                        {/* row.facilityAmountPaid */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="text" 
                                                name="facilityAmountPaid"
                                                value={currentEditRow.facilityAmountPaid ? currentEditRow.facilityAmountPaid : ''}
                                                onChange={(event) => handleChangeEdit(event, 'facilityAmountPaid')}
                                                style={{width: '8ch'}}
                                            />
                                        </TableCell>

                                        {/* row.checkNumber */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="text" 
                                                name="checkNumber"
                                                value={currentEditRow.checkNumber ? currentEditRow.checkNumber : ''}
                                                onChange={(event) => handleChangeEdit(event, 'checkNumber')}
                                                style={{width: '6ch'}}
                                            />
                                        </TableCell>

                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {row.revenue}
                                        </TableCell>

                                        {/* row.writeOff */}
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            <input 
                                                type="checkbox"
                                                name="writeOff"
                                                value={currentEditRow.writeOff ? true : false}
                                                checked={currentEditRow.writeOff ? true : false}
                                                onChange={(event) => handleChangeEdit(event, 'writeOff')}
                                            />
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
                                                    onClick={() => selected.length === 0 && startEditing(j, row)}
                                                    />
                                                    </Grid>}
                                                </Grid>
                                        </TableCell>

                                        </>
                                        :
                                        <>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "serviceType", "select", serviceTypes)} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.serviceType}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "v1500", "date")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.v1500}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "d1500Sent", "date")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.d1500Sent}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "d1500SendFormat", "select", ['', 'Email', 'Fax', 'Mail'])} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.d1500SendFormat}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "adjusterRate", "text")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.adjusterRate}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px', backgroundColor: row.adjusterPastDueFormula === 'Yes' && '#F5B7B1'  }}>
                                            {row.adjusterDateDueFormula}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "paymentStatus", "select", status)} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.paymentStatus}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "paymentStatusDate", "date")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.paymentStatusDate}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "dateRebilled", "date")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.dateRebilled}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "rebillFormat", "select", ['', 'Email', 'Fax', 'Mail'])} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.rebillFormat}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "adjusterDatePaid", "date")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.adjusterDatePaid}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "adjusterAmountPaid", "text")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.adjusterAmountPaid}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {row.facilityRate}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px', backgroundColor: row.facilityPastDueFormula === 'Yes' && '#F5B7B1' }}>
                                            {row.facilityDateDueFormula}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "facilityDatePaid", "date")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.facilityDatePaid}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "facilityAmountPaid", "text")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.facilityAmountPaid}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "checkNumber", "text")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.checkNumber}
                                        </TableCell>
                                        <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                            {row.revenue}
                                        </TableCell>
                                        <TableCell onClick={(e) => handleOpenGrid(e, row, "writeOff", "checkbox")} sx={{ borderRight: 1, padding: '0px 0px 0px 5px', fontSize: 11, }}>
                                                {row.writeOff}
                                        </TableCell>
                                        </>
                                        }

                                        
                                    </TableRow>
                                )}
                )}
            </TableBody>
        </Table>
    </TableContainer>

    <Popover
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        id="add-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        >

            {menuType === 'grid' &&
            <>

            {(gridEditType === 'date' || gridEditType === 'text') &&
            <input 
            type={gridEditType}
            name={gridEditKey}
            value={gridEditVal ? gridEditVal : ''}
            onChange={(event) => handleChangeGridEdit(event)}
            />
            }

            {gridEditType === 'select' &&
            <select
            onChange={(event) => handleChangeGridEdit(event)}
            value={gridEditVal ? gridEditVal : ''}
            name={gridEditKey}
            >
                {gridEditOptions.map((o, i) => (
                    <option key={i} value={o}>{o}</option>
                ))}
            </select>
            }

            {gridEditType === 'textarea' &&
            <textarea
            name={gridEditKey}
            value={gridEditVal ? gridEditVal : ''}
            onChange={(event) => handleChangeGridEdit(event)}
            />
            }

            {gridEditType === 'checkbox' &&
            <input 
            type="checkbox"
            id={`${gridEditKey}-checkbox`}
            name={gridEditKey}
            value={gridCheckboxChecked}
            checked={gridCheckboxChecked}
            onChange={(event) => handleChangeGridEdit(event)}
            />
            }

            <Button onClick={handleGridSubmit}>Update</Button>
            </>
            }
            
        </Popover>

    <Modal
    disableEscapeKeyDown
    open={bulkModalOpen}
    onClose={handleModalClose}
    aria-labelledby="modal-bulkEdit-apptVerif"
    >
    <>
        <Box sx={style}>
        <Grid container spacing={0.5}>
            <Grid item xs={11}>
            <h2>Edit {selected.length} row{selected.length > 1 ? 's' : ''}</h2>
            </Grid>
            <Grid item xs={1}>
            <button onClick={handleModalClose}>x</button>
            </Grid>
        </Grid>
        <Grid container spacing={1}>
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'serviceType')}
                            color="primary"
                            checked={enabled.serviceType ? true : false}
                            inputProps={{
                            'aria-labelledby': 'serviceTypeBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="serviceType" style={{display: 'block'}}>{"Type:"}</label>
                        <select
                            disabled={!enabled.serviceType}
                            onChange={(event) => handleChangeBulkEdit(event, 'serviceType')}
                            value={currentBulkEdit.serviceType ? currentBulkEdit.serviceType : -1}
                            name="serviceType"
                        >
                            <option value={""}>{"---"}</option>
                            {['Daily', 'InitialEval', 'Combined', 'Re-Eval', 'WC (2hr.)', 'WC (3hr.)', 'WH (2hr.)', 'WH (3hr.)'].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'v1500')}
                            color="primary"
                            checked={enabled.v1500 ? true : false}
                            inputProps={{
                            'aria-labelledby': 'v1500Box',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="v1500" style={{display: 'block'}}>{"V1500:"}</label>
                        <input 
                            disabled={!enabled.v1500}
                            type="date" 
                            name="v1500"
                            value={currentBulkEdit.v1500 ? currentBulkEdit.v1500 : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'v1500')}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'd1500Sent')}
                            color="primary"
                            checked={enabled.d1500Sent ? true : false}
                            inputProps={{
                            'aria-labelledby': 'd1500Box',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="d1500Sent" style={{display: 'block'}}>{"D1500:"}</label>
                        <input 
                            disabled={!enabled.d1500Sent}
                            type="date" 
                            name="d1500Sent"
                            value={currentBulkEdit.d1500Sent ? currentBulkEdit.d1500Sent : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'd1500Sent')}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'd1500SendFormat')}
                            color="primary"
                            checked={enabled.d1500SendFormat ? true : false}
                            inputProps={{
                            'aria-labelledby': 'd1500Box',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="d1500SendFormat" style={{display: 'block'}}>{"Format:"}</label>
                        <select
                            disabled={!enabled.d1500SendFormat}
                            onChange={(event) => handleChangeBulkEdit(event, 'd1500SendFormat')}
                            value={currentBulkEdit.d1500SendFormat ? currentBulkEdit.d1500SendFormat : -1}
                            name="d1500SendFormat"
                        >

                            <option value={""}>{"---"}</option>
                            {['Email', 'Fax', 'Mail'].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'adjusterRate')}
                            color="primary"
                            checked={enabled.adjusterRate ? true : false}
                            inputProps={{
                            'aria-labelledby': 'adjusterRateBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="adjusterRate" style={{display: 'block'}}>{"Adj. Rate:"}</label>
                        <input 
                            disabled={!enabled.adjusterRate}
                            type="text" 
                            name="adjusterRate"
                            value={(currentBulkEdit.adjusterRate && currentBulkEdit.adjusterRate !== -1) ? currentBulkEdit.adjusterRate : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'adjusterRate')}
                            style={{width: '8ch'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'paymentStatus')}
                            color="primary"
                            checked={enabled.paymentStatus ? true : false}
                            inputProps={{
                            'aria-labelledby': 'paymentStatusBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="paymentStatus" style={{display: 'block'}}>{"Pmt Status:"}</label>
                        <select
                            disabled={!enabled.paymentStatus}
                            onChange={(event) => handleChangeBulkEdit(event, 'paymentStatus')}
                            value={currentBulkEdit.paymentStatus ? currentBulkEdit.paymentStatus : -1}
                            name="paymentStatus"
                        >

                            <option value={""}>{"---"}</option>
                            {['NOF', 'IP', 'DEN', 'SP', 'DNC'].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'paymentStatusDate')}
                            color="primary"
                            checked={enabled.paymentStatusDate ? true : false}
                            inputProps={{
                            'aria-labelledby': 'paymentStatusDateBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="paymentStatusDate" style={{display: 'block'}}>{"Pmt Status Date:"}</label>
                        <input 
                            disabled={!enabled.paymentStatusDate}
                            type="date" 
                            name="paymentStatusDate"
                            value={currentBulkEdit.paymentStatusDate ? currentBulkEdit.paymentStatusDate : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'paymentStatusDate')}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'dateRebilled')}
                            color="primary"
                            checked={enabled.dateRebilled ? true : false}
                            inputProps={{
                            'aria-labelledby': 'dateRebilledBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="dateRebilled" style={{display: 'block'}}>{"Rebill Date:"}</label>
                        <input 
                            disabled={!enabled.dateRebilled}
                            type="date" 
                            name="dateRebilled"
                            value={currentBulkEdit.dateReblled ? currentBulkEdit.dateReblled : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'dateRebilled')}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'rebillFormat')}
                            color="primary"
                            checked={enabled.rebillFormat ? true : false}
                            inputProps={{
                            'aria-labelledby': 'rebillFormatBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="rebillFormat" style={{display: 'block'}}>{"Format:"}</label>
                        <select
                            disabled={!enabled.rebillFormat}
                            onChange={(event) => handleChangeBulkEdit(event, 'rebillFormat')}
                            value={currentBulkEdit.rebillFormat ? currentBulkEdit.rebillFormat : -1}
                            name="rebillFormat"
                        >

                            <option value={""}>{"---"}</option>
                            {['Email', 'Fax', 'Mail'].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'adjusterDatePaid')}
                            color="primary"
                            checked={enabled.adjusterDatePaid ? true : false}
                            inputProps={{
                            'aria-labelledby': 'adjusterDatePaidBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="adjusterDatePaid" style={{display: 'block'}}>{"Adj Paid:"}</label>
                        <input 
                            disabled={!enabled.adjusterDatePaid}
                            type="date" 
                            name="adjusterDatePaid"
                            value={currentBulkEdit.adjusterDatePaid ? currentBulkEdit.adjusterDatePaid : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'adjusterDatePaid')}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {/* <Box width="100%" /> */}
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'adjusterAmountPaid')}
                            color="primary"
                            checked={enabled.adjusterAmountPaid ? true : false}
                            inputProps={{
                            'aria-labelledby': 'adjusterAmountPaidBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="adjusterAmountPaid" style={{display: 'block'}}>{"Amt:"}</label>
                        <input 
                            disabled={!enabled.adjusterAmountPaid}
                            type="text" 
                            name="adjusterAmountPaid"
                            value={(currentBulkEdit.adjusterAmountPaid && currentBulkEdit.adjusterAmountPaid !== -1) ? currentBulkEdit.adjusterAmountPaid : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'adjusterAmountPaid')}
                            style={{width: '8ch'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'facilityDatePaid')}
                            color="primary"
                            checked={enabled.facilityDatePaid ? true : false}
                            inputProps={{
                            'aria-labelledby': 'facilityDatePaidBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="facilityDatePaid" style={{display: 'block'}}>{"PT Paid:"}</label>
                        <input 
                            disabled={!enabled.facilityDatePaid}
                            type="date" 
                            name="facilityDatePaid"
                            value={currentBulkEdit.facilityDatePaid ? currentBulkEdit.facilityDatePaid : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'facilityDatePaid')}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {/* <Box width="100%" /> */}
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'facilityAmountPaid')}
                            color="primary"
                            checked={enabled.facilityAmountPaid ? true : false}
                            inputProps={{
                            'aria-labelledby': 'facilityAmountPaidBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="facilityAmountPaid" style={{display: 'block'}}>{"Amt:"}</label>
                        <input 
                            disabled={!enabled.facilityAmountPaid}
                            type="text" 
                            name="facilityAmountPaid"
                            value={(currentBulkEdit.facilityAmountPaid && currentBulkEdit.facilityAmountPaid !== -1) ? currentBulkEdit.facilityAmountPaid : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'facilityAmountPaid')}
                            style={{width: '8ch'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'checkNumber')}
                            color="primary"
                            checked={enabled.checkNumber ? true : false}
                            inputProps={{
                            'aria-labelledby': 'checkNumberBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="checkNumber" style={{display: 'block'}}>{"Check #:"}</label>
                        <input 
                            disabled={!enabled.checkNumber}
                            type="text" 
                            name="checkNumber"
                            value={(currentBulkEdit.checkNumber && currentBulkEdit.checkNumber !== -1) ? currentBulkEdit.checkNumber : ''}
                            onChange={(event) => handleChangeBulkEdit(event, 'checkNumber')}
                            style={{width: '8ch'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <Grid container>
                    <Grid item>
                        <Checkbox
                            onClick={(event) => handleEnableBulkField(event, 'writeOff')}
                            color="primary"
                            checked={enabled.writeOff ? true : false}
                            inputProps={{
                            'aria-labelledby': 'writeOffBox',
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <label htmlFor="writeOff" style={{display: 'block'}}>{"Write-Off:"}</label>
                        <Checkbox 
                            disabled={!enabled.writeOff}
                            type="text" 
                            name="writeOff"
                            checked={currentBulkEdit.writeOff ? true : false}
                            // value={currentBulkEdit.writeOff ? currentBulkEdit.writeOff : ''}
                            onClick={(event) => handleChangeBulkEdit(event, 'writeOff')}
                            style={{width: '8ch'}}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Box width="100%" />
            <Grid item>
                <button onClick={handleBulkSubmit}>Update</button>
            </Grid>
        </Grid>
        </Box>
    </>
    </Modal>
    </>);
}