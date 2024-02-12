import { useState, useRef, useContext, Fragment } from 'react';
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
import DehazeIcon from '@mui/icons-material/Dehaze';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Divider from '@mui/material/Divider';

import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import {times} from '../lookup-tables/lookup_times'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import useUpdateVisit from '../hooks/useUpdateVisit';
import useGetReferralVisits from '../hooks/useGetReferralVisits';
import useGetReferralAuth from '../hooks/useGetReferralAuth';
import useDeleteVisit from '../hooks/useDeleteVisit';

import VisitTally from './VisitTally';

import {Calendar} from "react-multi-date-picker"

import { useParams } from 'react-router-dom';

import '../App.css';

export default function ApptVerification(props) {

    let { id: linkId } = useParams();

    const [editIDx, setEditIDx] = useState(-1);
    const [revertData, setRevertData] = useState({});
    const [currentEditRow, setCurrentEditRow] = useState({});
    const [currentBulkEdit, setCurrentBulkEdit] = useState({});
    
    const [selected, setSelected] = useState([]);
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [enabled, setEnabled] = useState({});

    const [dates, setDates] = useState([]);
    const [ucaTimes, setUcaTimes] = useState([]);
    const [timeMode, setTimeMode] = useState('same');
    const [time, setTime] = useState('');

    const [needPNvalue, setNeedPNValue] = useState(Boolean(currentEditRow?.needPN));

    let prevAttend = "";
    let visitNum = 0;
    let authNum = 0;

    const mutationUpdate = useUpdateVisit();
    const mutationDelete = useDeleteVisit();

    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetReferralVisits(linkId);
    const { status: statusAuth, data: auth, error: errorAuth, isFetching: isFetchingAuth } = useGetReferralAuth(linkId);

    const blankDOS = visits?.filter(v => v.dos === null);

    // console.log(blankDOS);

    const StyledTableCell = styled(TableCell)({
        padding: '0px 0px 0px 5px',
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    });

    const style = {
        position: 'absolute',
        // marginTop: '100px',
        // marginLeft: '400px',
        // marginRight: '400px',
        bottom: '40%',
        left: '35%',
        overflowY: 'scroll',
        // transform: 'translate(-20%, -20%)',
        width: 800,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        maxHeight: 900,
    };

    const startEditing = (i, row) => {
        console.log("start editing");
        // console.log(row);
        setEditIDx(i);
        setRevertData(row);
        setCurrentEditRow(row);
    }

    const handleRemove = (id) => {
        console.log("delete");
        //submit delete request
        id && mutationDelete.mutate(id);
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

    const handleStartBulkEdit = (event, key) => {
        // console.log('BULK');
        // open modal
        setBulkModalOpen(true);
        setModalType('bulk');
        
    };

    const handleStartUCA = (event, key) => {
        // console.log('UCA');
        // open modal
        setBulkModalOpen(true);
        setModalType('uca');
        console.log(ucaTimes);
        
    };

    const handleOpenAuth = (event, key) => {
        // console.log('Open Auth menu');
        // open menu
        // setMenuOpen(true);
        // setMenuType('auth');
        
    };

     const handleModalClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setBulkModalOpen(false);
            setModalType(null);
            setDates([]);
            setUcaTimes([]);
            setTimeMode('same');
            setTime('')
        }
    };

    const handleBulkSubmit = (event, key) => {
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
        setModalType(null);
        
    }

    const handleUCASubmit = (event, key) => {
        // submit data
        console.log('SUBMIT THE UPCOMING APPTS');
        console.log(dates);
        console.log(ucaTimes);

        const appts = dates.map((d, i) => ({dos: d.toDate().toISOString(), dosTime: timeMode === 'same' ? time : (ucaTimes[i] || null)}))

        console.log("appts:", appts);


        blankDOS.length >= appts.length && Promise.all(
            appts.map((a, i) => {

                const vals = {...a, billingId: blankDOS[i].billingId}

                return mutationUpdate.mutate(vals);

            })
        );
        handleModalClose();
        
    }

    const handleClearSelected = (event, key) => {

        console.log('CLEAR SELECTION');

        // reset selected
        setSelected([]);      
        
    }

    const handleChangeBulkEdit = (event, key) => {
        let newValues;
        newValues = {...currentBulkEdit, [key]: event.target.value === '' ? null : event.target.value};
        setCurrentBulkEdit(newValues);
        // console.log(key, newRow[key]);
        // console.log(event.target.value);
    }

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
        // console.log(selected);

        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelected = visits.map((v) => v.billingId);
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

    const handleEnableBulkField = (event, field) => {

        setEnabled({...enabled, [field]: !enabled[field]});

        if (!enabled[field]) {
            setCurrentBulkEdit({...currentBulkEdit, [field]: null})
        }
        else if (enabled[field]) {
            setCurrentBulkEdit({...currentBulkEdit, [field]: -1})
        }
    };

    const handleChangeDates = (newDates) => {

        let temp = [];
        let newTimes = [];
        
        if (newDates.length > dates.length) {
            console.log("PUSH")
            // date added, push
            if (timeMode === 'different') {
                temp.push('');
            }
            if (timeMode === 'same') {
                temp.push(time);
            }
            newTimes = [...ucaTimes, ...temp];
            
        }
        else if (newDates.length < dates.length) {
            console.log("POP")
            // date removed, pop
            temp = [...ucaTimes];
            temp.pop()
            newTimes = [...temp];
        }

        console.log("newTimes", newTimes)
        setUcaTimes(newTimes)
        setDates(newDates)

    }

     const handleToggleTimeMode = (event) => {
        setTimeMode(event.target.value);
        if (event.target.value === 'different') {
            setTime('');
            const newTimes = new Array(dates.length).fill(time || '');
            setUcaTimes(newTimes)
        }
    };

    const handleChangeTime = (event) => {
        setTime(event.target.value);
        if (ucaTimes.length > 0) {
            const newTimes = ucaTimes.map(u => event.target.value);
            setUcaTimes(newTimes);
        }
    }

    const handleChangeUcaTimes = (event, i) => {
        const newTimes = [...ucaTimes.slice(0, i), event.target.value, ...ucaTimes.slice(i, ucaTimes.length - 1)];
        console.log(newTimes)
        setUcaTimes(newTimes)
    }

    const isSelected = (billingId) => selected.indexOf(billingId) !== -1;

    // extract into reusable file
    function EnhancedTableToolbar(props) {
        const { numSelected } = props;

        return (
            <Toolbar
            // disableGutters
            variant='dense'
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...({
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
            >
            <IconButton onClick={handleStartBulkEdit} disabled={numSelected === 0}>
                <DehazeIcon /><EditIcon />
            </IconButton>
            <IconButton onClick={handleStartUCA}>
                <CalendarMonthIcon />
            </IconButton>

            <Grid container spacing={2}>
                <Grid item>
                     
                </Grid>
                <Grid item>
                    <IconButton onClick={handleOpenAuth}>
                        <FormatListNumberedIcon />
                    </IconButton>    
                </Grid>
                <Grid item>
                    <VisitTally sx={{marginLeft: 2}} />
                </Grid>
            </Grid>            

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

    return (
        <>
        <EnhancedTableToolbar numSelected={selected.length} />

        <TableContainer component={Paper} sx={{ height: 500 }}>
            <Table stickyHeader size="small" aria-label="apptVerification table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={selected?.length > 0 && selected?.length < visits?.length}
                                checked={selected?.length > 0 && selected?.length === visits?.length}
                                onChange={handleSelectAllClick}
                                inputProps={{
                                'aria-label': 'select all visits',
                                }}
                            />
                        </TableCell>
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
                        <TableCell sx={{ fontSize: 12 }}></TableCell>
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
                                    let au = auth && auth[authNum]?.approvedVisits;
                                    if (visitNum > au){
                                        visitNum = 1;
                                        authNum = authNum + 1;
                                    }
                                    au = auth && auth[authNum]?.approvedVisits;
                                    prevAttend = row.attend;

                                    const currentlyEditing = editIDx === j;

                                    const isItemSelected = isSelected(row.billingId);



                                    return (
                                        <TableRow
                                            hover
                                            selected={isItemSelected}
                                            key={row.billingId}
                                            // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            sx={{ backgroundColor: visitNum === 1 ? "#FFFACD" : (row.needPN === "Need PN" ? "#58D68D" : "white")}}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    onClick={(event) => handleClickBox(event, row.billingId)}
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                    'aria-labelledby': 'editBox',
                                                    }}
                                                />
                                            </TableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{authNum+1}</StyledTableCell>
                                            <StyledTableCell sx={{ borderRight: 1 }}>{visitNum+" of "+au}</StyledTableCell>
                                            
                                            {currentlyEditing ? 
                                            <>
                                            {/* dos */}
                                            <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                                <input 
                                                    type="date" 
                                                    name="dos"
                                                    value={currentEditRow.dos ? currentEditRow.dos : ''}
                                                    onChange={(event) => handleChangeEdit(event, 'dos')}
                                                />
                                            </TableCell>

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

                                            {currentEditRow.attend === "Yes" ?
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

                                            {currentEditRow.attend === "Yes" ?
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

                                            {currentEditRow.attend === "Yes" ?
                                            <>
                                            {/* v1500 */}
                                            <TableCell sx={{ borderRight: 1, fontSize: 11, padding: '0px 0px 0px 5px' }}>
                                                <input 
                                                    type="date" 
                                                    name="v1500"
                                                    value={currentEditRow.v1500 ? currentEditRow.v1500 : ''}
                                                    onChange={(event) => handleChangeEdit(event, 'v1500')}
                                                />
                                            </TableCell>
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
                                                        {!au ?
                                                        <DeleteIcon
                                                        sx={{cursor: "pointer"}}
                                                        fontSize='small'
                                                        onClick={() => handleRemove(row.billingId)}
                                                        />
                                                        :
                                                        <EditIcon
                                                        sx={{cursor: "pointer"}}
                                                        fontSize='small'
                                                        onClick={() => selected.length === 0 && startEditing(j, row)}
                                                        />
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

        <Modal
        disableEscapeKeyDown
        open={bulkModalOpen}
        onClose={handleModalClose}
        aria-labelledby="modal-bulkEdit-apptVerif"
        >
        <>
        {modalType === 'bulk' &&
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
                                    onClick={(event) => handleEnableBulkField(event, 'dosTime')}
                                    color="primary"
                                    checked={enabled.dosTime ? true : false}
                                    inputProps={{
                                    'aria-labelledby': 'dosTimeBox',
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <label htmlFor="dosTime" style={{display: 'block'}}>{"Time:"}</label>
                                <select
                                    disabled={!enabled.dosTime}
                                    onChange={(event) => handleChangeBulkEdit(event, 'dosTime')}
                                    value={currentBulkEdit.dosTime ? currentBulkEdit.dosTime : ''}
                                    name="dosTime"
                                >
                                    <option value={""}>{"---"}</option>
                                    {times.map((n) => (
                                        <option key={n.Time} value={n.Time}>{n.Time}</option>
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
                                    onClick={(event) => handleEnableBulkField(event, 'attend')}
                                    color="primary"
                                    checked={enabled.attend ? true : false}
                                    inputProps={{
                                    'aria-labelledby': 'attendBox',
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <label htmlFor="attend" style={{display: 'block'}}>{"Attend:"}</label>
                                <select
                                    disabled={!enabled.attend}
                                    onChange={(event) => handleChangeBulkEdit(event, 'attend')}
                                    value={currentBulkEdit.attend ? currentBulkEdit.attend : ""}
                                    name="attend"
                                >
                                    <option value={""}>{"---"}</option>
                                    {['Yes', 'No'].map((n) => (
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
                                    value={currentBulkEdit.serviceType ? currentBulkEdit.serviceType : ""}
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
                                    onClick={(event) => handleEnableBulkField(event, 'notesReceived')}
                                    color="primary"
                                    checked={enabled.notesReceived ? true : false}
                                    inputProps={{
                                    'aria-labelledby': 'notesReceivedBox',
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <label htmlFor="notesReceived" style={{display: 'block'}}>{"Notes Rec'd:"}</label>
                                <select
                                    disabled={!enabled.notesReceived}
                                    onChange={(event) => handleChangeBulkEdit(event, 'notesReceived')}
                                    value={currentBulkEdit.notesReceived ? currentBulkEdit.notesReceived : ""}
                                    name="notesReceived"
                                >
                                    <option value={""}>{"---"}</option>
                                    {['Daily', 'InitialEval', 'Re-Eval', 'Progress', 'Discharge'].map((n) => (
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
                                    onClick={(event) => handleEnableBulkField(event, 'dosNotes')}
                                    color="primary"
                                    checked={enabled.dosNotes ? true : false}
                                    inputProps={{
                                    'aria-labelledby': 'dosNotesBox',
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <label htmlFor="dosNotes" style={{display: 'block'}}>{"DOS Notes:"}</label>
                                <textarea
                                    disabled={!enabled.dosNotes}
                                    name="dosNotes"
                                    value={(currentBulkEdit.dosNotes && currentBulkEdit.dosNotes !== -1) ? currentBulkEdit.dosNotes : ''}
                                    onChange={(event) => handleChangeBulkEdit(event, 'dosNotes')}
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
        }
        {modalType === 'uca' &&
            <Box sx={style}>
                <Grid container spacing={0.5}>
                    <Grid item xs={11}>
                    <h2>Add Upcoming appts</h2><h4> ({blankDOS.length - dates.length} remaining)</h4>
                    <hr />
                    </Grid>
                    <Grid item xs={1}>
                    <button onClick={handleModalClose}>x</button>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item>

                        <Calendar
                        multiple
                        value={dates} 
                        onChange={(dates) => handleChangeDates(dates)}
                        // minDate={new Date().setDate(5)}
                        mapDays={({ date, isSameDate }) => {
                            
                            const matches = dates.filter(d => isSameDate(date, d))
                            
                            if (dates.length === blankDOS.length && matches.length === 0) {
                                return {
                                disabled: true,
                                // style: { color: "#ccc" },
                                // onClick: () => alert("weekends are disabled")
                                }
                            }
                        }}
                        />

                    </Grid>
                    <Grid item>
                        
                            <ToggleButtonGroup
                            size="small"
                            value={timeMode}
                            exclusive
                            onChange={handleToggleTimeMode}
                            aria-label="timeMode"
                            >
                                <ToggleButton value={'same'} aria-label="non-monthlys">
                                Same Time
                                </ToggleButton>
                                <ToggleButton value={'different'} aria-label="monthlys">
                                Different Times
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <br />
                            <br />

                            {dates.map((d, i) => (
                                <Fragment key={i}>
                                    <u>{`${d}`}</u> at {timeMode === 'same' ? 
                                                        time 
                                                        : 
                                                        <select
                                                        value={ucaTimes[i] || ''}
                                                        onChange={(e) => handleChangeUcaTimes(e, i)}
                                                        >
                                                            <option value={''}>Select Time</option>
                                                            {times.map((n, i) => (<option key={i} value={n.Time}>{n.Time}</option>))}
                                                        </select>}
                                                        <br/><br/>
                                </Fragment>
                            ))}
                        
                    </Grid>
                    <Grid item>
                       {timeMode === 'same' && <select
                        onChange={handleChangeTime}
                        value={time}
                        name="dosTime"
                        >
                            <option value={''}>Select Time</option>
                            {times.map((n) => (
                                <option key={n.Time} value={n.Time}>{n.Time}</option>
                            ))}
                        </select>}
                    </Grid>

                    <Box width="100%" />      
                    <Grid item>
                        <button onClick={handleUCASubmit}>Update</button>
                    </Grid>
                </Grid>
            </Box>
        }
        </>
        </Modal>
        </>
    );
}