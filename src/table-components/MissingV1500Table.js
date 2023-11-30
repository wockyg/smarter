import { useState, useContext, useRef, useMemo, Fragment } from 'react';
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
import { visuallyHidden } from '@mui/utils';

import Checkbox from '@mui/material/Checkbox';
import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DehazeIcon from '@mui/icons-material/Dehaze';
import EditIcon from '@mui/icons-material/Edit';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';


import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';

import emailjs from '@emailjs/browser';

import DownloadIcon from '@mui/icons-material/Download';

import { styled } from '@mui/material';

import { Link } from 'react-router-dom';

import useGetBulkBilling from '../hooks/useGetBulkBilling';
import useUpdateVisit from '../hooks/useUpdateVisit';
import useUpdateBulkBilling from '../hooks/useUpdateBulkBilling';
import useUpdateUserHistory from '../hooks/useUpdateUserHistory';
import useGetUser from '../hooks/useGetUser';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import { SearchContext } from '../contexts/SearchContext';

import { getComparator, handleChangePage, handleChangeRowsPerPage } from './TableComponents';

import { useDownloadExcel } from 'react-export-table-to-excel';

import { useParams } from 'react-router-dom';

import { useAuth0 } from "@auth0/auth0-react";

import './ReferralTable.css';


// extract into reusable file
function ReferralTableHead(props) {

  const { selected, rows, handleSelectAllClick, headCells, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
            <Checkbox
                color="primary"
                indeterminate={selected?.length > 0 && selected?.length < rows.length}
                checked={selected?.length > 0 && selected?.length === rows.length}
                onChange={handleSelectAllClick}
                inputProps={{
                'aria-label': 'select all missingV1500',
                }}
            />
        </TableCell>
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
              // onClick={createSortHandler(headCell.id)}
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
      </TableRow>
    </TableHead>
  );
}

 // extract into reusable file
function EnhancedTableToolbar(props) {

    const { numSelected, handleStartBulkEdit, handleSendEmail, handleClearSelected } = props;

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
            <Tooltip title="Edit">
            <IconButton onClick={handleStartBulkEdit}>
                <DehazeIcon /><EditIcon />
            </IconButton>
            </Tooltip>
        ) : ('')}

        {numSelected > 0 ? (
            <Tooltip title="Generate V1500 Request Email(s)">
            <IconButton onClick={handleSendEmail}>
                <ForwardToInboxIcon />
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

function removeDuplicates(rows) {

    let outputArray = rows.filter(function (v, i, self) {
 
        // It returns the index of the first
        // instance of each value
        return i === self.indexOf(v);
    });
 
    return outputArray;
}

export default function MissingV1500Table(props) {

    let { id: linkId } = useParams();

    const { user: userAuth0 } = useAuth0();

    const { email, nickname, updated_at } = userAuth0;

    const { status: statusUser, data: user, error: errorUser, isFetching: isFetchingUser } = useGetUser(email);

    const tableRef = useRef(null);

    const visitUpdate = useUpdateVisit();

    const { status: statusRows, data: bulkBillingTable, error: errorRows, isFetching: isFetchingRows } = useGetBulkBilling();

    const { setPage: setNotesPage, setTab: setClaimTab, billMode, keepBillMode, setBillMode, setKeepBillMode, setCptRows, setSelectedD1500 } = useContext(SelectedClaimContext);
    const { setQuickSearchVal, setQuickSearchInputVal } = useContext(SearchContext);

    const { rows, headCells, title } = props;

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('therapistDisplayShort');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [selected, setSelected] = useState([]);
    const [bulkModalOpen, setBulkModalOpen] = useState(false);
    const [billingEditModalOpen, setBillingEditModalOpen] = useState(false);
    const [enabled, setEnabled] = useState({});
    const [currentBulkEdit, setCurrentBulkEdit] = useState({});
    const [enabledBillingContactEdit, setEnabledBillingContactEdit] = useState({});
    const [billingContactEdit, setBillingContactEdit] = useState({});
    const [monthlys, setMonthlys] = useState('');
    const [aging, setAging] = useState(0);
    const [editBillingProfile, setEditBillingProfile] = useState({});

    const rowsAged = rows?.filter(r => {
      const now = new Date().getTime();
      const then = new Date(r.dos).getTime();
      const timeDifference = now - then;
      const dayDifference = timeDifference / (1000 * 3600 * 24);
      return (dayDifference > aging);
    });

    const filteredRows = rowsAged?.filter(r => (monthlys === 'Yes' ? r.billsMonthly === 'Yes' : r.billsMonthly !== 'Yes')); 

    const billingIdArray = filteredRows.map(r => r.bulkBillingId);

    const bulkBillingIdList = removeDuplicates(billingIdArray);

    const updateBulkBilling = useUpdateBulkBilling();

    const userHistoryUpdate = useUpdateUserHistory();

    const timestamp = new Date();

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      // console.log("isAsc", isAsc)
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: `Referrals ${title} ${timestamp}`,
        sheet: 'Sheet1'
    });

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

    `;

    const style = {
        position: 'absolute',
        // marginTop: '100px',
        // marginLeft: '400px',
        // marginRight: '400px',
        bottom: '40%',
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

    const handleClaimClicked = (event, claim) => {
        claim.referralId !== +linkId && userHistoryUpdate.mutate({initials: user?.initials, newId: claim.referralId});
        setNotesPage(0);
        setClaimTab(0);
        setQuickSearchVal(null);
        setQuickSearchInputVal('');
        setCptRows([]);
        setSelectedD1500(null);
        if (claim.billingStatus === null || !keepBillMode) {
          setBillMode(false);
          setKeepBillMode(false);
        }
    };
    const handleToggleMonthlys = (event) => {
        setMonthlys(event.target.value);
        console.log(event.target.value);
    };

    const handleToggleAging = (event) => {
        setAging(+event.target.value);
        console.log(+event.target.value);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
        const newSelected = rows.map((v) => v.billingId);
        setSelected(newSelected);
        // setEditIDx(-1);
        // setRevertData({});
        // setCurrentEditRow({});
        return;
        }
        setSelected([]);
        // setEditIDx(-1);
        // setRevertData({});
        // setCurrentEditRow({});
    };

    const handleSelectSubgroupClick =  (event, relevantRows) => {

        const fullSubgroup = relevantRows.map((v) => v.billingId);

        if (event.target.checked) {
          setSelected([...selected, ...fullSubgroup]);
          // setEditIDx(-1);
          // setRevertData({});
          // setCurrentEditRow({});
          return;
        }

        let newSelected = [...selected];
        fullSubgroup.forEach(element => {

          newSelected = newSelected.filter(x => x !== element);
        });
        setSelected(newSelected);
        
        // setEditIDx(-1);
        // setRevertData({});
        // setCurrentEditRow({});
        // console.log(selected);
    };

    const isSubGroupIndeterminate =  (relevantRows) => {

        const fullSubgroup = relevantRows.map((v) => v.billingId);

        let i = 0;
        // let newSelected = [...selected];
        fullSubgroup.forEach(element => {
          if (selected.includes(element)) {
            i++;
          }
        });

        if ((i < fullSubgroup.length) && (i > 0)) {
          return true;
        }
        else {
          return false;
        }
        
    };

    const isSubGroupChecked =  (relevantRows) => {

        const fullSubgroup = relevantRows.map((v) => v.billingId);
        let i = 0;
        // let newSelected = [...selected];
        fullSubgroup.forEach(element => {
          if (selected.includes(element)) {
            i++;
          }
        });

        if (i === fullSubgroup.length) {
          return true;
        }
        else {
          return false;
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
        // console.log(selected);

        // setEditIDx(-1);
        // setRevertData({});
        // setCurrentEditRow({});
    };

    const handleClearSelected = () => {

        console.log('CLEAR SELECTION');

        // reset selected
        setSelected([]);      
        
    }

    const isSelected = (billingId) => selected.indexOf(billingId) !== -1;

    const handleStartBulkEdit = () => {
        console.log('BULK');
        // open modal
        setBulkModalOpen(true);
        
    }

    const handleOpenBillingEditModal = (profile) => {
      setEditBillingProfile(profile);
      setBillingContactEdit(profile);
      setBillingEditModalOpen(true);
    }
    
    const handleCloseBillingEditModal = (event, reason) => {
       if (reason !== 'backdropClick') {
          setBillingEditModalOpen(false);
          setEnabledBillingContactEdit({});
          setBillingContactEdit({});
          setEditBillingProfile({});
        }
    }

    const handleEnableBillingEditField = (event, field) => {

        setEnabledBillingContactEdit({...enabledBillingContactEdit, [field]: !enabledBillingContactEdit[field]});

        // if (!enabledBillingContactEdit[field]) {
        //     setBillingContactEdit({...billingContactEdit, [field]: null})
        // }
        // else if (enabledBillingContactEdit[field]) {
        //     setBillingContactEdit({...billingContactEdit, [field]: -1})
        // }
    };

    const handleChangeBillingContactEdit = (event, key) => {
        let newValues;
        newValues = {...billingContactEdit, [key]: event.target.value === '' ? null : event.target.value};
        setBillingContactEdit(newValues);
        // console.log(key, newRow[key]);
        // console.log(event.target.value);
    }

    const handleBillingContactSubmit = (event, key) => {

        console.log('Update billing info...');
        // console.log(billingContactEdit);

        const keys = Object.keys(billingContactEdit);
        const changedKeys = keys.filter(k => billingContactEdit[k] !== editBillingProfile[k]);
        const values = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: billingContactEdit[key] }), {});

        if (Object.keys(values).length > 0) {
            console.log("submitting values:", {bulkBillingId: editBillingProfile.bulkBillingId, ...values});
            updateBulkBilling.mutate({bulkBillingId: editBillingProfile.bulkBillingId, ...values});
        }
        else {
            console.log("nothing to update...")
        }

        // reset enabledBillingContactEdit
        setEnabledBillingContactEdit({});
        // reset Fields
        setBillingContactEdit({});
        // close modal
        handleCloseBillingEditModal();
        
    }


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
        // console.log(key, newRow[key]);
        // console.log(event.target.value);
    }

    const handleModalClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setBulkModalOpen(false);
            setEnabled({});
            setCurrentBulkEdit({});
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
                visitUpdate.mutate({...values, billingId: billingId});
            });
        }
        else {
            console.log("nothing to update...")
        }
        // reset selected
        setSelected([]);
        
        // close modal
        handleModalClose();
        
    }

    const handleSendEmail = () => {

        console.log('SEND EMAIL');

        const selectedRows = selected.map(element =>{
          const selectedRow = rows.filter((e) => e.billingId === element)[0];
          return {
                    billingId: element, 
                    bulkBillingId: selectedRow.bulkBillingId,
                    claimNumber: selectedRow.claimNumber, 
                    claimant: selectedRow.claimant, 
                    claimantBirthDate: selectedRow.claimantBirthDate,
                    bodyPart: selectedRow.bodyPart,
                    dos: selectedRow.dos
                 };
        });

        const billingEmailIdArray = selectedRows.map(r => r.bulkBillingId);

        const bulkBillingEmailIdList = removeDuplicates(billingEmailIdArray);

        // console.log(selectedRows);

        bulkBillingEmailIdList.forEach((e) => {

          const emailRows = selectedRows.filter((x) => x.bulkBillingId === e);

          console.log(emailRows);

          const emailBody = true && 
                          `<html>
                              <head>
                                  <style>
                                      table, th, td {
                                      border: 1px solid black !important;
                                      }
                                      th {
                                      text-align: center !important;
                                      }
                                      td {
                                      text-align: left !important;
                                      }
                                  </style>
                              </head>
                              <body>
                                Good morning,
                                <br>
                                <br>
                                <br>
                                Could you please provide us with the physical therapy bills and notes for the following dates of service:
                                <br>
                                <br>
                                Please disregard if already sent. Thank you.
                                <br>
                                <br>

                                <table>
                                  <tr>
                                    <th>Claim#</th>
                                    <th>Claimant</th>
                                    <th>DOB</th>
                                    <th>BodyPart</th>
                                    <th>DOS</th>
                                    <th>Needed</th>
                                  </tr>
                                  ${emailRows.map((r) => {
                                    return (
                                      `<tr>
                                        <td>
                                          ${r.claimNumber}
                                        </td>
                                        <td>
                                          ${r.claimant}
                                        </td>
                                        <td>
                                          ${r.claimantBirthDate}
                                        </td>
                                        <td>
                                          ${r.bodyPart}
                                        </td>
                                        <td>
                                          ${r.dos}
                                        </td>
                                        <td>
                                          HCFA & PT Notes
                                        </td>
                                      </tr>`
                                    );
                                  }).join('')}
                                </table>

                                <br>
                                Please note, delay in receiving bills could result in a delay of payment for services rendered.
                                <br>
                                <br>
                                <mark>Please fax them to 800-701-3965 or email to patient.records@definedpt.com.</mark>
                                <br>
                                <br>
                                Thank you in advance and have a great day!
                                <br>
                                <br>
                              </body>
                          </html>`;

          const toEmail = 'wmcclure@definedpt.com';

          const params = {
              to_email: toEmail,
              subject: `Missing v1500 request`,
              message: (selectedRows.length > 0) ? emailBody : 'ERROR- PLEASE CONTACT SYSTEM ADMIN'
          };

          emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, '0mive5-lH56wNnNf7')
          .then((res) => {
              alert("Email sent successfully.");
              console.log(res.status, res.text);
              console.log(params);
              selected.forEach((e) => {
                visitUpdate.mutate({billingId: e, v1500LastRequested: new Date().toDateString()});
              })
              setSelected([]);
          }, (err) => {
              console.log(err.text);
          });  
        })      
        
    }

    return(
    <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>

          <Grid container spacing={2}>
            <Grid item>
              <IconButton onClick={onDownload}>
                <DownloadIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
              size="small"
              value={monthlys}
              exclusive
              onChange={handleToggleMonthlys}
              aria-label="monthlys"
              >
                <ToggleButton value={''} aria-label="non-monthlys">
                  Non-Monthlys
                </ToggleButton>
                <ToggleButton value={'Yes'} aria-label="monthlys">
                  Monthlys
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
              size="small"
              value={aging}
              exclusive
              onChange={handleToggleAging}
              aria-label="aging"
              >
                <ToggleButton value={0} aria-label="0days">
                  {'>0 Days'}
                </ToggleButton>
                <ToggleButton value={30} aria-label="30days">
                  {'>30 Days'}
                </ToggleButton>
                <ToggleButton value={60} aria-label="60days">
                  {'>60 Days'}
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

            <EnhancedTableToolbar
            numSelected={selected.length}
            handleStartBulkEdit={handleStartBulkEdit}
            handleSendEmail={handleSendEmail}
            handleClearSelected={handleClearSelected}
            />

            <TableContainer sx={{ height: 400 }}>
                <Table
                stickyHeader
                sx={{ minWidth: 750 }}
                size="small" 
                aria-label={`referrals-${title}-table`}
                ref={tableRef}
                >
                    <ReferralTableHead
                    selected={selected}
                    rows={rows}
                    handleSelectAllClick={handleSelectAllClick}
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                        {bulkBillingIdList?.map((id, index) => {

                          const labelId = `referrals-missingV1500-table-${index}`;

                          const billingProfile = bulkBillingTable?.filter(x => x.bulkBillingId === id)[0];

                          const relevantRows = filteredRows.filter(r => r.bulkBillingId === id);

                          // console.log(billingProfile);

                          return (
                            <Fragment key={index}>
                            <TableRow key={index} sx={{ background: '#D6DBDF' }}>
                              <TableCell padding="checkbox">
                                  <Checkbox
                                      color="primary"
                                      indeterminate={isSubGroupIndeterminate (relevantRows)}
                                      checked={isSubGroupChecked (relevantRows)}
                                      onChange={(e) => handleSelectSubgroupClick(e, relevantRows)}
                                      inputProps={{
                                      'aria-label': 'select all missingV1500',
                                      }}
                                  />
                              </TableCell>
                              <TableCell sx={{ fontSize: 13, maxWidth: 100, whiteSpace: 'nowrap' }}>
                                <u>
                                {billingProfile?.bulkBillingDisplay === undefined ? 'blank' : billingProfile?.bulkBillingDisplay}
                                </u>
                                <IconButton onClick={() => handleOpenBillingEditModal(billingProfile)}>
                                  <EditIcon fontSize='small' />
                                </IconButton>
                              </TableCell>
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell />
                              <TableCell />
                            </TableRow>
                            {relevantRows.map((row, i) => {

                              const isItemSelected = isSelected(row.billingId);

                              return(
                                
                                <TableRowStyled
                                hover
                                tabIndex={-1}
                                key={i}
                                id={labelId}
                                className={row.referralId === +linkId ? (row.serviceGeneral === "FCE" ? 'selectedClaimRowFCE' : 'selectedClaimRowDPT') : (row.serviceGeneral === "FCE" && 'regularRowFCE')}
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
                                  <TableCell sx={{ paddingLeft: 3, fontSize: 12, borderRight: 1, borderColor: '#D5D8DC'}}>
                                    {row.claimant}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: 12, borderRight: 1, borderColor: '#D5D8DC'}}>
                                    <Link to={`/${row.referralId}`} className='claimNumber-button' onClick={(event) => handleClaimClicked(event, row)}>
                                            {row.claimNumber ? row.claimNumber : 'WILL GET'}
                                        </Link>
                                  </TableCell>
                                  <TableCell sx={{ fontSize: 12, borderRight: 1, borderColor: '#D5D8DC'}}>
                                    {row.therapistDisplayShort}
                                    {/* <br /> */}
                                    {/* {`P: ${row?.therapistPhone} ${row?.therapistPhoneExt ? ` x${row?.therapistPhoneExt}` : ''}`} {`,  F: ${row?.therapistFax}`} */}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: 12, borderRight: 1, borderColor: '#D5D8DC'}}>
                                    {row.dos}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: 12, borderRight: 1, borderColor: '#D5D8DC'}}>
                                    {row.notesReceived}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: 12, borderRight: 1, borderColor: '#D5D8DC'}}>
                                    {row.v1500}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: 12, borderRight: 1, borderColor: '#D5D8DC'}}>
                                    {row.v1500LastRequested}
                                  </TableCell>
                                  <TableCell sx={{ fontSize: 12, borderRight: 1, borderColor: '#D5D8DC'}}>
                                    {row.v1500Status}
                                  </TableCell>
                                </TableRowStyled>
                                
                              );
                            })}
                              
                            </Fragment>
                          );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {`${filteredRows.length} rows`}
        </Paper>
        <Modal
        id="bulkEditModal"
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
                                onClick={(event) => handleEnableBulkField(event, 'v1500Status')}
                                color="primary"
                                checked={enabled.v1500Status ? true : false}
                                inputProps={{
                                'aria-labelledby': 'v1500StatusBox',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="v1500Status" style={{display: 'block'}}>{"V1500 Status:"}</label>
                            <textarea
                                disabled={!enabled.v1500Status}
                                name="v1500Status"
                                value={(currentBulkEdit.v1500Status && currentBulkEdit.v1500Status !== -1) ? currentBulkEdit.v1500Status : ''}
                                onChange={(event) => handleChangeBulkEdit(event, 'v1500Status')}
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
        <Modal
        id="billingEditModal"
        disableEscapeKeyDown
        open={billingEditModalOpen}
        onClose={handleCloseBillingEditModal}
        aria-labelledby="modal-billingEdit"
        >
        <>
            <Box sx={style}>
            <Grid container spacing={0.5}>
                <Grid item xs={11}>
                <h2>Edit Billing Contact Info</h2>
                </Grid>
                <Grid item xs={1}>
                <button onClick={handleCloseBillingEditModal}>x</button>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Checkbox
                                onClick={(event) => handleEnableBillingEditField(event, 'billingContact')}
                                color="primary"
                                checked={enabledBillingContactEdit.billingContact ? true : false}
                                inputProps={{
                                'aria-labelledby': 'billingContactBox',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="billingContact" style={{display: 'block'}}>{"Contact:"}</label>
                            <input
                                type="text"
                                name="billingContact"
                                disabled={!enabledBillingContactEdit.billingContact}
                                value={billingContactEdit.billingContact ? billingContactEdit.billingContact : ""}
                                onChange={(event) => handleChangeBillingContactEdit(event, 'billingContact')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Box width="100%" />
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Checkbox
                                onClick={(event) => handleEnableBillingEditField(event, 'billingEmail')}
                                color="primary"
                                checked={enabledBillingContactEdit.billingEmail ? true : false}
                                inputProps={{
                                'aria-labelledby': 'billingEmailBox',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="billingEmail" style={{display: 'block'}}>{"Email:"}</label>
                            <input
                                type="text"
                                name="billingEmail"
                                disabled={!enabledBillingContactEdit.billingEmail}
                                value={billingContactEdit.billingEmail ? billingContactEdit.billingEmail : ""}
                                onChange={(event) => handleChangeBillingContactEdit(event, 'billingEmail')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Box width="100%" />
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Checkbox
                                onClick={(event) => handleEnableBillingEditField(event, 'billingPhone')}
                                color="primary"
                                checked={enabledBillingContactEdit.billingPhone ? true : false}
                                inputProps={{
                                'aria-labelledby': 'billingPhoneBox',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="billingPhone" style={{display: 'block'}}>{"Phone:"}</label>
                            <input
                                type="text"
                                name="billingPhone"
                                disabled={!enabledBillingContactEdit.billingPhone}
                                value={billingContactEdit.billingPhone ? billingContactEdit.billingPhone : ""}
                                onChange={(event) => handleChangeBillingContactEdit(event, 'billingPhone')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Box width="100%" />
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Checkbox
                                onClick={(event) => handleEnableBillingEditField(event, 'billingFax')}
                                color="primary"
                                checked={enabledBillingContactEdit.billingFax ? true : false}
                                inputProps={{
                                'aria-labelledby': 'billingFaxBox',
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <label htmlFor="billingFax" style={{display: 'block'}}>{"Fax:"}</label>
                            <input
                                type="text"
                                name="billingFax"
                                disabled={!enabledBillingContactEdit.billingFax}
                                value={billingContactEdit.billingFax ? billingContactEdit.billingFax : ""}
                                onChange={(event) => handleChangeBillingContactEdit(event, 'billingFax')}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Box width="100%" />                
                <Grid item>
                    <button onClick={handleBillingContactSubmit}>Update</button>
                </Grid>
            </Grid>
            </Box>
        </>
        </Modal>
        
    </Box>
    
    );
}