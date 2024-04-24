import { useState, useContext, useRef, Fragment } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Fab from '@mui/material/Fab';
import ListItemText from '@mui/material/ListItemText';

import { visuallyHidden } from '@mui/utils';

import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import DehazeIcon from '@mui/icons-material/Dehaze';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DownloadingIcon from '@mui/icons-material/Downloading';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import PendingIcon from '@mui/icons-material/Pending';

import CircularProgress from '@mui/material/CircularProgress';

import PropTypes from 'prop-types';

import { styled } from '@mui/material';

import { alpha } from '@mui/material/styles';

import { Link } from 'react-router-dom';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import { SearchContext } from '../contexts/SearchContext';
import { DetailsContext } from '../contexts/DetailsContext';
import { RecordsRequestContext } from '../contexts/RecordsRequestContext';

import { useNavigate } from "react-router-dom";

import { useDownloadExcel } from 'react-export-table-to-excel';
import useDeleteReferral from '../hooks/useDeleteReferral';
import useUpdateVisit from '../hooks/useUpdateVisit';
import useUpdateFceppdBilling from '../hooks/useUpdateFceppdBilling';
import useUpdateReferral from '../hooks/useUpdateReferral';
import useUpdateUserHistory from '../hooks/useUpdateUserHistory';
import useUpdateV1500Upload from '../hooks/useUpdateV1500Upload';
import useGetUser from '../hooks/useGetUser';
import useUpdateRRLastWorked from '../hooks/useUpdateRRLastWorked';
import useGetCptForAllStates from '../hooks/useGetCptForAllStates';
import useGetReferralsOrphan from '../hooks/useGetReferralsOrphan';
import useAddV1500Sensible from '../hooks/useAddV1500Sensible';
import useAddV1500Nanonets from '../hooks/useAddV1500Nanonets';
import useTestWebhook from '../hooks/useTestWebhook';
import useTestWebhookNanonets from '../hooks/useTestWebhookNanonets';

import V1500UploadsMenu from '../claim-info/V1500UploadsMenu';
import UploadButton from '../billing-tab/UploadButton';

import { saveAs } from 'file-saver';
import RecordsRequestLetter from '../document-templates/RecordsRequestLetter';
import { BlobProvider, Document, Page, Text, pdf, usePDF } from '@react-pdf/renderer';

import { Formik, Form, Field, useField } from 'formik';
import * as Yup from 'yup';

import { UserContext } from '../contexts/UserContext';

import { useAuth0 } from "@auth0/auth0-react";


import { useParams } from 'react-router-dom';

import { green } from '@mui/material/colors';


import './ReferralTable.css';

function ReferralTableHead(props) {

  const { headCells, order, orderBy, onRequestSort, inlineEdit, bulkEdit, removable, selected, rows, handleSelectAllClick, reminders } = props;

  return (
    <TableHead>
      <TableRow>
        {bulkEdit &&
        <TableCell padding="checkbox">
            <Checkbox
                color="primary"
                indeterminate={selected?.length > 0 && selected?.length < rows?.length}
                checked={selected?.length > 0 && selected?.length === rows?.length}
                onChange={handleSelectAllClick}
                inputProps={{
                'aria-label': 'select all visitsB',
                }}
            />
        </TableCell>
        }
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='left'
            // padding={headCell.disablePadding ? 'none' : 'normal'}
            // padding='none'
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontSize: 12, padding: '5px' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={(e) => onRequestSort(e, headCell.id)}
            >
              <u>{headCell.label}</u>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        {inlineEdit &&
        <TableCell />
        }
        {removable &&
        <TableCell />
        }
        {reminders &&
        <TableCell />
        }
      </TableRow>
    </TableHead>
  );
}

 // extract into reusable file
function EnhancedTableToolbar(props) {
    const { numSelected, handleStartBulkEdit, handleClearSelected, type, preference, handlePreference, filter, handleFilter, therapistSearchVal, setTherapistSearchVal } = props;

    return (
        <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...({
            bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
        >

            <Grid container spacing={2}>
                <Grid item>
                    {/* <Tooltip title="Bulk Edit"> */}
                    <IconButton onClick={handleStartBulkEdit} disabled={numSelected === 0}>
                        <DehazeIcon /><EditIcon />
                    </IconButton>
                    {/* </Tooltip> */}
                </Grid>
                {type === 'rr' &&
                <Grid item>
                <ToggleButtonGroup
                size="small"
                value={preference}
                exclusive
                onChange={handlePreference}
                aria-label="text alignment"
                >
                    <ToggleButton value="fax" aria-label="fax">
                        Fax/None
                    </ToggleButton>
                    <ToggleButton value="phone" aria-label="phone">
                        Phone
                    </ToggleButton>
                    <ToggleButton value="email" aria-label="email">
                        Email
                    </ToggleButton>
                    <ToggleButton value="all" aria-label="all">
                        All
                    </ToggleButton>
                </ToggleButtonGroup>
                </Grid>
                }
                {type === 'rr' &&
                <Grid item>
                <ToggleButtonGroup
                size="small"
                value={filter}
                exclusive
                onChange={handleFilter}
                aria-label="text alignment"
                >
                    <ToggleButton value="tbw" aria-label="tbw">
                        TBW
                    </ToggleButton>
                    <ToggleButton value="worked" aria-label="worked">
                        Worked
                    </ToggleButton>
                    <ToggleButton value="fuh" aria-label="fuh">
                        FU/H
                    </ToggleButton>
                    <ToggleButton value="cu" aria-label="cu">
                        Caught Up
                    </ToggleButton>
                    <ToggleButton value="" aria-label="all">
                        All
                    </ToggleButton>
                </ToggleButtonGroup>
                </Grid>
                }
                {type === 'rr' &&
                <Grid item>
                <TextField 
                type='text' 
                // style={{marginRight: 10, padding: 5}}
                onChange={(e) => setTherapistSearchVal(e.target.value)}
                value={therapistSearchVal}
                label="Therapist"
                InputProps={{
                    endAdornment: (
                    <IconButton 
                    onClick={() => setTherapistSearchVal('')}
                    sx={{visibility: therapistSearchVal !== '' ? 'visible' : 'hidden'}}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                    )
                }}
                />
                </Grid>
                }

                {numSelected > 0 ? (
                    <Grid item>
                    <Typography
                    // sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                    >
                    {numSelected} selected
                    </Typography>
                    </Grid>
                ) : ('')}
            
            </Grid>
            

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

const StyledTableCell = styled(TableCell)({
    padding: '5px 0px 5px 2px', 
    // paddingLeft: 5,
    // paddingRight: 5,
    fontSize: 11,
});

const TableRowStyled = styled(TableRow)`
    &:nth-of-type(even) {
    background-color: #F0F0F0;
    }

    cursor: pointer

`;

export default function ReferralTable(props) {

    let { id: linkId } = useParams();

    const { user, nickname, updated_at } = useContext(UserContext);

    // console.log(nickname);

    const tableRef = useRef(null);

    const navigate = useNavigate();

    const timestamp = new Date();

    const { rows, headCells, initialSort, initialSortOrder, removable, title, inlineEdit, bulkEdit, type, cptRowsNotApproved, preference, handlePreference, filter, handleFilter, cc } = props;

    // console.log(cptRowsNotApproved);

    const { status: statusCpt, data: codes, error: errorCpt, isFetching: isFetchingCpt } = useGetCptForAllStates();
    const { status: statusOrphan, data: orphan, error: errorOrphan, isFetching: isFetchingOrphan } = useGetReferralsOrphan();

    const { setPage: setNotesPage, setTab: setClaimTab, setBillMode, keepBillMode, setKeepBillMode, cptRows, setCptRows, selectedV1500, setSelectedV1500, v1500UploadProgress, setV1500UploadProgress } = useContext(SelectedClaimContext);
    const { setQuickSearchVal, setQuickSearchInputVal } = useContext(SearchContext);
    const { setCurrentlyEditingSelectedClaim } = useContext(DetailsContext);
    const { therapistSearchVal, setTherapistSearchVal } = useContext(RecordsRequestContext);

    const mutationDelete = useDeleteReferral();
    const visitUpdate = useUpdateVisit();
    const fceUpdate = useUpdateFceppdBilling();
    const referralUpdate = useUpdateReferral();
    const userHistoryUpdate = useUpdateUserHistory();
    const rrLastWorkedUpdate = useUpdateRRLastWorked();
    const v1500Update = useUpdateV1500Upload();
    const v1500AddSensible = useAddV1500Sensible();
    const v1500AddNanonets = useAddV1500Nanonets();
    const webhookTest = useTestWebhookNanonets();

    const [order, setOrder] = useState(initialSortOrder || 'asc');
    const [orderBy, setOrderBy] = useState(initialSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [menuType, setMenuType] = useState(null);

    const [editIDx, setEditIDx] = useState(-1);
    const [revertData, setRevertData] = useState({});
    const [currentEditRow, setCurrentEditRow] = useState({});

    const [currentBulkEdit, setCurrentBulkEdit] = useState({});
    const [selected, setSelected] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [enabled, setEnabled] = useState({});

    const [generateRR, setGenerateRR] = useState(false);
    const [includeIA, setIncludeIA] = useState(false);
    const [includePN, setIncludePN] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);

    const [orphanVal, setOrphanVal] = useState('');
    const [orphanId, setOrphanId] = useState(null);

    // console.log(uploadedFiles[0]);

    const open = Boolean(anchorEl);

    const rowsSorted = rows.sort((a, b) => {
      const valueA = a[orderBy] === null ? '' : (typeof a[orderBy] === "string" ? a[orderBy].toUpperCase() : a[orderBy]);
      const valueB = b[orderBy] === null ? '' : (typeof b[orderBy] === "string" ? b[orderBy].toUpperCase() : b[orderBy]);
      if (order === 'asc') {
        if (valueA < valueB) {
          // console.log(`${valueA } < ${valueB}`);
          return -1;
        }
        if (valueA > valueB) {
          // console.log(`${valueA } > ${valueB}`);
          return 1;
        }
      }
      if (order === 'desc') {
        if (valueA < valueB) {
          // console.log(`${valueA } < ${valueB}`);
          return 1;
        }
        if (valueA > valueB) {
          // console.log(`${valueA } > ${valueB}`);
          return -1;
        }
      }
      // values must be equal
      return 0;
    });

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `Referrals ${title} ${timestamp}`,
        sheet: 'Sheet1'
    });

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    // const handlePrevRowClassName = (className) => {
    //     setPrevRowClassName(className);
    // };
    // const handlePrevRowId = (id) => {
    //     setPrevRowId(id);
    // };

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const buttonSx = {
        ...(success && {
        bgcolor: green[500],
        '&:hover': {
            bgcolor: green[700],
        },
        }),
    };

    

    const handleClaimClicked = (event, claim) => {
        console.log("claim clicked...")
        claim.referralId !== +linkId && userHistoryUpdate.mutate({initials: user?.initials, newId: claim.referralId});
        setNotesPage(0);
        setClaimTab(0);
        setQuickSearchVal(null);
        setQuickSearchInputVal('');
        setCptRows([]);
        setSelectedV1500(null);
        if (claim.billingStatus === null || !keepBillMode) {
          setBillMode(false);
          setKeepBillMode(false);
        }
        setCurrentlyEditingSelectedClaim(false);
    };

    const handleChooseOrphan = (id) => {
        console.log("choose orphan...")
        // console.log(event.target.value)
        setOrphanId(id)
    };

    const handleChangeOrphanOption = (event) => {
        console.log("orphan option changed...")
        navigate(`/${event.target.value}`);
        setOrphanVal(event.target.value)
        // console.log(event.target.value)
        // +event.target.value !== +linkId && userHistoryUpdate.mutate({initials: user?.initials, newId: event.target.value});
        setBillMode(false);
        setKeepBillMode(false);
        setNotesPage(0);
        setClaimTab(0);
        setQuickSearchVal(null);
        setQuickSearchInputVal('');
        setCptRows([]);
        setSelectedV1500(null);
        setCurrentlyEditingSelectedClaim(false);
    };

    const handleUpdateOrphan = (event) => {
        console.log("updating orphan...")
        v1500Update.mutate({v1500Id: orphanId, referralId: orphanVal})
    };

    const handleClickHcfa = (event, row) => {
        // console.log("ROW: ", row);
        
        if (row.referralId) {
            navigate(`/${row.referralId}`)
            setNotesPage(0);
            setClaimTab(0);
            setQuickSearchVal(null);
            setQuickSearchInputVal('');
            setBillMode(true);
            const newRows = cptRowsNotApproved?.filter(r => r.v1500Id === row.v1500Id);
            // console.log("NEW ROWS: ", newRows);
            // calculate rates for each row
            // TODO turn in to reusable helper fn
            const newnewRows = newRows.map(r => {
                const rateBase = r.cpt ? codes?.filter(c => c?.Code === +r?.cpt)[0][row?.jurisdiction] : -1;
                const rateTotal = (rateBase * +r.units * ((100 - (+row?.clientDiscount || 0)) / 100)).toFixed(2);
                return {...r, charges: rateTotal}
            })
            setCptRows(newnewRows);
            setSelectedV1500(row);
        }
    };

    const handleOpenMenu = (event, id) => {
        setAnchorEl(event.currentTarget);
        setMenuType("deleteReferral")
        setDeleteId(id);

    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setDeleteId(null);
    };

    const handleDeleteReferral = () => {
        mutationDelete.mutate(deleteId);
        // setNotesPage(0);
        // setClaimTab(0);
        handleCloseMenu();
    };

    const startEditing = (i, row) => {
        console.log("start editing");
        // console.log(row);
        setEditIDx(i);
        setRevertData(row);
        setCurrentEditRow(row);
    };

    const cancelEdit = () => {
        console.log("cancel edit");
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    };

    const handleChangeEdit = (event, key) => {
        
        const newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value};
        setCurrentEditRow(newRow);
    };

    const handleChangeEditCheckbox = (event, key) => {
        
        const newRow = {...currentEditRow, [key]: !currentEditRow[key]};
        setCurrentEditRow(newRow);
    };

    const stopEditing = (row) => {
        console.log("done editing");
        const keys = Object.keys(row);
        const changedKeys = keys.filter(index => row[index] !== currentEditRow[index]);
        const values = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: currentEditRow[key] }), {});
        console.log(values);
        if (Object.keys(values).length > 0) {
            if (type === 'bil') {
                values.billingId = row.billingId;
                visitUpdate.mutate(values);
            }
            else if(type === 'fce') {
                values.referralId = row.referralId;
                fceUpdate.mutate(values);
            }
            else if(type === 'ref') {
                values.referralId = row.referralId;
                referralUpdate.mutate(values);
            }
        }

        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    };

    const handleUpdateV1500 = (event, row) => {
        console.log("Attaching v1500 to referal...");
        const values = {v1500Id: row.v1500Id, referralId: event.target.value};
        console.log(values);
        v1500Update.mutate(values);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelected = rows?.map((v) => type === 'bil' ? v.billingId : v.referralId);
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

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleClickBox = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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

    const handleStartBulkEdit = () => {
        console.log('BULK');
        // open modal
        setModalType('bulk')
        setModalOpen(true);
        
    };

    const handleClickUpload = (event) => {
        console.log('OPEN UPLOAD menu');
        setAnchorEl(event.currentTarget);
        setMenuType("uploadButton")
        // open modal
        // setModalType('upload')
        // setModalOpen(true);
        
    };

    const handleOpenUploadModal = (event) => {
        // open modal
        setModalType('upload')
        setModalOpen(true);
        
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
        let newValues;
        newValues = {...currentBulkEdit, [key]: event.target.value === '' ? null : event.target.value};
        setCurrentBulkEdit(newValues);
        // console.log(newValues?.writeOff);
    };

    const handleChangeRRIAPN = (key) => {
        if (key === 'rr') {
            setGenerateRR(!generateRR);
            if (generateRR === false) {
                setIncludeIA(false);
                setIncludePN(false);
            }
        }
        if (key === 'pn') {
            setIncludePN(!includePN);
        }
        if (key === 'ia') {
            setIncludeIA(!includeIA);
        }
    };

    const handleModalClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setModalOpen(false);
            setModalType(null)
            setEnabled({});
            setIncludeIA(false);
            setIncludePN(false);
            setGenerateRR(false);
            setUploadComplete(false);
            setUploadedFiles([])
            setV1500UploadProgress([])
        }
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
                visitUpdate.mutate({...values, billingId: billingId});
            });
        }
        else if (type === 'rr') {
            console.log("Generating letter(s)...");

            // --One File Per Patient--//
            selected.forEach(s => {
                const timestamp = new Date();
                const referral = rows.filter(r => r.referralId === s)[0];
                const rrLetter = (
                    <RecordsRequestLetter selectedClaim={referral} />
                );
                pdf(rrLetter).toBlob().then(blob => {
                    console.log(blob);
                    saveAs(blob, `Records Request - ${referral.therapistBeaver} - ${referral.claimant}`);
                    referralUpdate.mutate({referralId: referral.referralId, rrLastWorked: timestamp, rrFaxReceived: null});
                    rrLastWorkedUpdate.mutate({rrLastWorked: timestamp});
                })
                .catch(e => console.log("Error Generating Letters:", e))

            })

            // --One File Per Therapist--//
            // let therapists = [];
            // selected.forEach(s => {
            //     const referral = rows.filter(r => r.referralId === s)[0];
            //     therapists.push(referral.therapistId);
            // });
            // const uniqueTherapists = Array.from(new Set(therapists));
            // uniqueTherapists.forEach(t => {
            //     const referrals = rows.filter(r => r.therapistId === t);
            //     // console.log(t);
            //     // console.log(referrals);
            //     const rrLetter = (
            //     <Document>
            //         {referrals.map(r => <RecordsRequestLetter key={r.referralId} selectedClaim={r} />)}
            //     </Document>
            //     );
            //     pdf(rrLetter).toBlob().then(blob => {
            //         // console.log("BLOB:", blob)
            //         // console.log("referrals:", referrals)
            //         saveAs(blob, `PT Patient Records Request - ${t}.pdf`);
            //     });

            // })
            // console.log(uniqueTherapists);
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

    const handleReminderWorked = (e, referralId) => {
        console.log("Reminder Worked");
        const values  = {referralId: referralId, reminderDate: null, reminderNote: null};
        referralUpdate.mutate(values);
    };

    const handleUploadFiles = (files) => {
        const uploaded = [...uploadedFiles]
        files.forEach((file) => uploaded.push(file))
        setUploadedFiles(uploaded)
    };

    const handleFileEvent = (e) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles)
    };

    const handleUploadSubmit = (method) => {
        // submit data
        console.log('SUBMIT THE V1500s');
        console.log(uploadedFiles);

        const formData = new FormData();
        uploadedFiles.forEach(file => {
            formData.append("v1500Blobs", file);
        })

        formData.append("userId", user.userId)

        // method === 'sensible' && uploadedFiles.length > 0 && v1500AddSensible.mutate(formData)

        method === 'nanonets' && uploadedFiles.length > 0 && v1500AddNanonets.mutate(formData, {onSuccess:  (newData) => {setUploadComplete(true)}})
        
        // close modal
        // handleModalClose();
        
    };

    const handleViewOrphan = () => {
        console.log('VIEW ORPHAN');
        webhookTest.mutate();
    };

    const handleTestWebhook = () => {
        console.log('TEST THE WEBHOOK');
        webhookTest.mutate();
    };

    

    let prevRowClassName = 'alternateColorA';

    return(
    <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>

            {type === 'hcfa' &&
                <Button size='small' onClick={handleTestWebhook}>
                    Test Webhook
                </Button>
            }

            {type === 'hcfa' &&
                JSON.stringify(v1500UploadProgress)
            }

            {type === 'hcfa' &&
                <UploadButton handleClickUpload={handleClickUpload} />
            }
          
            {!cc && type !== 'hcfa' &&
            <Button variant="text" onClick={onDownload}>
              <DownloadIcon />
            </Button>
            }

            {bulkEdit &&
            <EnhancedTableToolbar
            numSelected={selected.length}
            handleStartBulkEdit={handleStartBulkEdit}
            handleClearSelected={handleClearSelected}
            type={type}
            preference={preference}
            handlePreference={handlePreference}
            filter={filter}
            handleFilter={handleFilter}
            therapistSearchVal={therapistSearchVal}
            setTherapistSearchVal={setTherapistSearchVal}
            />
            }

            <TableContainer sx={{ height: cc ? 300 : 400 }}>
                <Table
                stickyHeader
                sx={{ minWidth: 750 }}
                size="small" 
                aria-label={`referrals-${title}-table`}
                ref={tableRef}
                >
                    <ReferralTableHead
                    headCells={headCells}
                    inlineEdit={inlineEdit}
                    bulkEdit={bulkEdit}
                    removable={removable}
                    reminders={title === 'Reminders' ? true : false}
                    selected={selected}
                    handleSelectAllClick={handleSelectAllClick}
                    rows={rows}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={(e, v) => handleRequestSort(e, v)}
                    />
                    <TableBody>
                        {rowsSorted
                        .map((row, index, arr) => {

                            const labelId = `referrals-${title}-table-${index}`;

                            let rowColor;

                            if (type === 'rr') {
                                const sameId = arr[index - 1]?.therapistId === row.therapistId;
                                if (!sameId) {
                                    rowColor = prevRowClassName === 'alternateColorB' ? 'alternateColorA' : 'alternateColorB';
                                }
                                else {
                                    rowColor = prevRowClassName;
                                }
                                prevRowClassName = rowColor;
                            }

                            const currentlyEditing = editIDx === index;
                            const isItemSelected = isSelected(type === 'bil' ? row.billingId : row.referralId);
                            return (
                                <TableRowStyled
                                hover
                                tabIndex={-1}
                                key={type === 'bil' ? row.billingId : (type === 'hcfa' ? row.v1500Id : row.referralId)}
                                id={labelId}
                                className={
                                    type === 'rr'
                                    ?
                                        (row.referralId === +linkId 
                                         ? 
                                            'selectedClaimRowDPT'
                                         :
                                            `${rowColor}`
                                        )
                                    :
                                        (type === 'hcfa'
                                        ?
                                            row.v1500Id === selectedV1500?.v1500Id
                                            ?
                                            'selectedClaimRowDPT'
                                            :
                                            null
                                        :
                                        (row.referralId === +linkId 
                                         ? 
                                            (row.serviceGeneral === "FCE" ? 'selectedClaimRowFCE' : 'selectedClaimRowDPT') 
                                         :
                                            (row.serviceGeneral === "FCE" && 'regularRowFCE')
                                        )
                                        )
                                        
                                        
                                }
                                onClick={(e) => type === 'hcfa' && handleClickHcfa(e, row)}
                                >
                                    {bulkEdit &&
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                        onClick={(event) => handleClickBox(event, type === 'bil' ? row.billingId : row.referralId)}
                                        color="primary"
                                        checked={isItemSelected}
                                        inputProps={{
                                        'aria-labelledby': 'editBoxB',
                                        }}
                                        />
                                    </TableCell>
                                    }

                                    {headCells.map((col) => {
                                    
                                    return (
                                        <StyledTableCell sx={{ borderRight: 1 }} key={col.id} align="left">
                                            
                                            {col.id === 'claimNumber' && type !== 'hcfa' ?
                                                <Link to={`/${row.referralId}`} className='claimNumber-button' onClick={(event) => handleClaimClicked(event, row)}>
                                                    {row.claimNumber ? row.claimNumber : 'WILL GET'}
                                                </Link>
                                            :
                                                row[col.id] === true ?
                                                    <CheckIcon />
                                                :  
                                                    (col.enableEdit && currentlyEditing) ?
                                                        <>
                                                        {col.inputType === 'select' &&
                                                        <select
                                                        name={col.id}
                                                        value={currentEditRow[col.id] ? currentEditRow[col.id] : ''}
                                                        onChange={(event) => handleChangeEdit(event, col.id)}
                                                        style={{width: col.inputWidth || 'auto'}}
                                                        >
                                                                <option value=''>-</option>
                                                                {col.options.map((n) => (
                                                                    <option key={n} value={n}>{n}</option>
                                                                ))}
                                                        </select>
                                                        }
                                                        {(col.inputType === 'text' || col.inputType === 'date') &&
                                                        <input 
                                                        type={col.inputType}
                                                        name={col.id}
                                                        value={currentEditRow[col.id] ? currentEditRow[col.id] : ''}
                                                        onChange={(event) => handleChangeEdit(event, col.id)}
                                                        style={{width: col.inputWidth || 'auto'}}
                                                        />
                                                        }
                                                        {(col.inputType === 'textarea') &&
                                                        <textarea 
                                                        name={col.id}
                                                        value={currentEditRow[col.id] ? currentEditRow[col.id] : ''}
                                                        onChange={(event) => handleChangeEdit(event, col.id)}
                                                        // style={{width: col.inputWidth || 'auto'}}
                                                        rows="5"
                                                        cols="65"
                                                        />
                                                        }
                                                        {(col.inputType === 'checkbox') &&
                                                            <input 
                                                            type="checkbox"
                                                            name={col.id}
                                                            value={currentEditRow[col.id] ? true : false}
                                                            checked={currentEditRow[col.id] ? true : false}
                                                            onChange={(event) => handleChangeEditCheckbox(event, col.id)}
                                                            />
                                                        }
                                                        </>
                                                    :
                                                        ((type === 'hcfa' && col.id === 'bodyPart' && !row.referralId) ?
                                                            
                                                            orphanId !== row.v1500Id ?
                                                            <Button 
                                                            size='small' 
                                                            onClick={(e) => handleChooseOrphan(row.v1500Id)}>
                                                                {orphan?.filter(o => o.claimNumber === row.claim_number).length} choices
                                                            </Button>
                                                            :
                                                            <Grid container spacing={1}>
                                                                <Grid item>
                                                                    <select
                                                                    name={col.id}
                                                                    value={orphanVal}
                                                                    onChange={handleChangeOrphanOption}
                                                                    // style={{width: col.inputWidth || 'auto'}}
                                                                    >
                                                                            <option value=''>Select</option>
                                                                            {orphan?.filter(o => o.claimNumber === row.claim_number).map((o, i) => (
                                                                                <option key={i} value={o.referralId}>{`(${o.service}) ${o.bodyPart}`}</option>
                                                                            ))}
                                                                    </select>
                                                                </Grid>
                                                                <Grid item>
                                                                    {orphanVal !== '' &&
                                                                    <IconButton onClick={handleUpdateOrphan}>
                                                                        <CheckIcon fontSize='small' />
                                                                    </IconButton>
                                                                    }
                                                                </Grid>
                                                            </Grid>

                                                            // <Grid container spacing={1}>
                                                            //     <Grid item>
                                                            //         <Formik
                                                            //         enableReinitialize
                                                            //         initialValues={{
                                                            //             v1500Id: row.v1500Id,
                                                            //             referralId: '',
                                                            //         }}
                                                            //         validationSchema={Yup.object({
                                                            //             v1500Id: Yup.number().required(),
                                                            //             referralId: Yup.number().required(),
                                                            //         })}
                                                            //         onSubmit={(values, actions) => {

                                                            //             console.log("values:", values)

                                                            //             console.log("updating V1500...", values);

                                                            //             values.referralId !== '' && v1500Update.mutate(values);

                                                            //             actions.setSubmitting(false);

                                                            //         }}
                                                            //         >
                                                            //             {formikProps => (
                                                            //                 <Form>
                                                            //                     <Grid container spacing={0.5}>
                                                            //                         <Grid item>
                                                            //                             <Field 
                                                            //                             as="select" 
                                                            //                             id="referralId"
                                                            //                             name="referralId"
                                                            //                             // className="redBorder"
                                                            //                             onChange={handleChangeOrphan}
                                                            //                             value={orphanVal}
                                                            //                             >
                                                            //                                 <option value=''>Select</option>
                                                            //                                 {orphan?.filter(o => o.claimNumber === row.claim_number).map((o, i) => (
                                                            //                                     <option key={i} value={o.referralId}>{`(${o.service}) ${o.bodyPart}`}</option>
                                                            //                                 ))}
                                                            //                             </Field>
                                                            //                         </Grid>
                                                            //                         <Grid item>
                                                            //                             <Button size='small' type='submit'><CheckIcon fontSize='small' /></Button>
                                                            //                         </Grid>
                                                            //                         {JSON.stringify(formikProps.values)}
                                                            //                         {/* <Grid item>
                                                            //                             <IconButton size='small' onClick={() => handleViewOrphan()}><RemoveRedEyeIcon fontSize='small' /></IconButton>
                                                            //                         </Grid> */}
                                                            //                     </Grid>
                                                            //                 </Form>
                                                            //             )}
                                                            //         </Formik>
                                                            //     </Grid>
                                                            // </Grid>
                                                        :
                                                            ((type === 'hcfa' && col.id === 'bodyPart') ?
                                                                `(${row.service}) ${row.bodyPart}`
                                                            :
                                                                row[col.id]
                                                            )
                                                            
                                                    )
                                            }
                                        </StyledTableCell>
                                    )})}

                                    {removable &&
                                    <StyledTableCell sx={{ borderRight: 1 }} align="left">
                                    <div className="buttonContainer">
                                        <DeleteIcon onClick={(e) => handleOpenMenu(e, row.referralId)} />
                                    </div>
                                    </StyledTableCell>
                                    }

                                    {title === 'Reminders' &&
                                    <StyledTableCell sx={{ borderRight: 1 }} align="left">
                                    <div className="buttonContainer">
                                        {/* <IconButton> */}
                                            <CheckCircleIcon color='primary' fontSize='small' onClick={(e) => handleReminderWorked(e, row.referralId)} />
                                        {/* </IconButton> */}
                                    </div>
                                    </StyledTableCell>
                                    }

                                    {inlineEdit &&
                                    <StyledTableCell sx={{ borderRight: 1 }} align="left">
                                    {currentlyEditing ?
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
                                    :
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <EditIcon
                                            sx={{cursor: "pointer"}}
                                            fontSize='small'
                                            onClick={() => startEditing(index, row)}
                                            />
                                        </Grid>
                                        {/* <Grid item xs={6}>
                                            <DeleteIcon
                                            sx={{cursor: "pointer"}}
                                            fontSize='small'
                                            onClick={() => handleRemove(row.billingId)}
                                            />
                                        </Grid> */}
                                    </Grid>
                                    }
                                    </StyledTableCell>
                                    }
                                </TableRowStyled>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {`${rows.length} rows`}

        </Paper>
            <Menu
              id="delete-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
            >
                {menuType === "deleteReferral" &&
                <MenuItem onClick={handleDeleteReferral}>
                    Delete referral?
                </MenuItem>  
                }

                {menuType === "uploadButton" &&
                <MenuItem>
                <Grid container>
                    <Grid item>
                        <Button variant="contained" onClick={handleOpenUploadModal}>Upload new V1500's</Button>
                    </Grid>
                </Grid>
                    <Grid item>
                        <div onClick={() => console.log("View all uploads...")}><u>View all</u></div>
                    </Grid>
                </MenuItem>  
                }

                {menuType === "uploadButton" &&
                <MenuItem disableGutters>
                    {/* <ListItemText inset>Upload new V1500's</ListItemText> */}
                    <V1500UploadsMenu />
                </MenuItem>  
                }

            </Menu>

            <Dialog open={modalOpen} onClose={handleModalClose}>
              <DialogTitle>
                <Grid container spacing={0.5}>
                    <Grid item xs={11}>
                    {modalType === 'upload' && v1500UploadProgress.length === 0 &&
                    "Upload V1500s"
                    }
                    {modalType === 'upload' && v1500UploadProgress.length > 0 && v1500UploadProgress.filter(v => v.percentComplete === 100).length === v1500UploadProgress.length &&
                    "Upload complete"
                    }
                    {modalType === 'upload' && v1500UploadProgress.length > 0 && v1500UploadProgress.filter(v => v.percentComplete === 100).length < v1500UploadProgress.length &&
                    <>
                    Uploading {uploadedFiles.length} file{uploadedFiles.length > 1 && 's'}...
                    </>
                    }
                    {modalType === 'bulk' &&
                    `Edit ${selected.length} row${selected.length > 1 ? 's' : ''}`
                    }
                    
                    </Grid>

                    {/* <Grid item xs={11}>
                    {JSON.stringify(v1500UploadProgress || {})}
                    {modalType === 'upload' && v1500UploadProgress?.percentComplete < 100 && v1500UploadProgress?.percentComplete > 0 &&
                    <>
                    Uploading {uploadedFiles.length} file{uploadedFiles.length > 1 && 's'}...
                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress />
                        <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        >
                        <Typography variant="caption" component="div" color="text.secondary">
                            {`${v1500UploadProgress?.percentComplete}%`}
                        </Typography>
                        </Box>
                    </Box>
                    </>
                    }
                    {modalType === 'bulk' &&
                    `Edit ${selected.length} row${selected.length > 1 ? 's' : ''}`
                    }
                    
                    </Grid> */}
                    
                </Grid>
              </DialogTitle>
              <DialogContent>
                {modalType === 'bulk' &&
                <Grid container spacing={1}>
                  {headCells.filter(r => r.enableEdit === true).map((field) => {
                    return(
                    <Fragment key={`${field.id}Bulk`}>
                    <Grid item>
                        <Grid container>
                            <Grid item>
                                <Checkbox
                                    onClick={(event) => handleEnableBulkField(event, field.id)}
                                    color="primary"
                                    checked={enabled[field.id] ? true : false}
                                    inputProps={{
                                    'aria-labelledby': `${field.id}Box`,
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <label htmlFor={field.id} style={{display: 'block'}}>{`${field.label}`}</label>
                                {field.inputType === 'select' &&
                                <select
                                    disabled={!enabled[field.id]}
                                    onChange={(event) => handleChangeBulkEdit(event, field.id)}
                                    value={currentBulkEdit[field.id] ? currentBulkEdit[field.id] : -1}
                                    name={field.id}
                                >
                                    <option value=''>{"-"}</option>
                                    {field.options.map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                                }
                                {(field.inputType === 'text' || field.inputType === 'date') &&
                                <input 
                                    disabled={!enabled[field.id]}
                                    type={field.inputType}
                                    name={field.id}
                                    value={currentBulkEdit[field.id] ? currentBulkEdit[field.id] : ''}
                                    onChange={(event) => handleChangeBulkEdit(event, field.id)}
                                    style={{width: field.inputWidth || 'auto'}}
                                />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Box width="100%" />
                    </Fragment>
                    );
                  }) }
                  {type === 'rr' &&
                  <>
                  <Grid item>
                        <label htmlFor='generateRR' style={{display: 'block'}}>{`Generate RR Letter:`}</label>
                        <input 
                            type='checkbox'
                            name='generateRR'
                            value={generateRR}
                            onChange={() => handleChangeRRIAPN('rr')}
                            style={{width: 'auto'}}
                        />
                    </Grid>
                    <Box width="100%" />
                    <Grid item>
                        <label htmlFor='includeIA' style={{display: 'block'}}>{`Include IA Request:`}</label>
                        <input
                            disabled={!generateRR}
                            type='checkbox'
                            name='includeIA'
                            value={includeIA}
                            checked={includeIA}
                            onChange={() => handleChangeRRIAPN('ia')}
                            style={{width: 'auto'}}
                        />
                    </Grid>
                    <Box width="100%" />
                    <Grid item>
                        <label htmlFor='includePN' style={{display: 'block'}}>{`Include PN Request:`}</label>
                        <input
                            disabled={!generateRR}
                            type='checkbox'
                            name='includePN'
                            value={includePN}
                            checked={includePN}
                            onChange={() => handleChangeRRIAPN('pn')}
                            style={{width: 'auto'}}
                        />
                    </Grid>
                    </>
                  }
                </Grid>
                }
                {modalType === 'upload' &&
                <>
                {v1500UploadProgress.length === 0 &&
                <input multiple
                id='fileUpload'
                type='file' 
                accept='application/pdf'
                onChange={handleFileEvent}
                />
                }
                <div className="uploaded-files-list">
                    <ul>
                        {uploadedFiles.map((file, i) => {

                            const progress = v1500UploadProgress.filter(p => p.filename === file.name)[0]?.percentComplete || -1

                            return (
                                <li key={i}>
                                    {file.name}
                                    {progress === -1 && v1500UploadProgress.length > 0 &&
                                    <PendingIcon disabled />
                                    }
                                    {progress > 0 && progress < 100 &&
                                    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                        <CircularProgress />
                                        <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                        >
                                        <Typography variant="caption" component="div" color="text.secondary">
                                            {`${progress}%`}
                                        </Typography>
                                        </Box>
                                    </Box>
                                    }
                                    {progress === 100 &&
                                    <TaskAltIcon color="success" />
                                    }
                                </li>
                            )
                        })} 
                    </ul>
                </div>
                </>
                }
              </DialogContent>
              <DialogActions>
                {!uploadComplete &&
                <Button onClick={handleModalClose}>Cancel</Button>
                }
                {type === 'rr' &&
                <Button onClick={handleBulkSubmit}>Generate</Button>
                }
                {type === 'hcfa' && !uploadComplete &&
                <>
                {/* <Button onClick={() => handleUploadSubmit('sensible')}>Upload Sensible</Button> */}
                <Button onClick={() => handleUploadSubmit('nanonets')}>Upload</Button>
                </>
                }
                {type === 'hcfa' && uploadComplete &&
                <Button onClick={handleModalClose}>Done</Button>
                }
                {type !== 'rr' && type !== 'hcfa' && modalType === 'bulk' &&
                <Button onClick={handleBulkSubmit}>Update</Button>
                }
              </DialogActions>
            </Dialog>
    </Box>
    
    );
}