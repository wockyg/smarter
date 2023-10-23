import { useState, useContext, useRef } from 'react';
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
import { visuallyHidden } from '@mui/utils';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import { styled } from '@mui/material';

import { Link } from 'react-router-dom';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import { SearchContext } from '../contexts/SearchContext';

import { useDownloadExcel } from 'react-export-table-to-excel';
import useGetD1500NotSent from '../hooks/useGetD1500NotSent';
import useDeleteReferral from '../hooks/useDeleteReferral';
import useUpdateVisit from '../hooks/useUpdateVisit';

import { useParams } from 'react-router-dom';

import '../table-components/ReferralTable.css';

const headCells = [
  {
    id: 'assign',
    numeric: false,
    disablePadding: false,
    label: 'CC',
  },
  {
    id: 'service',
    numeric: false,
    disablePadding: false,
    label: 'Service',
  },
  {
    id: 'adjuster',
    numeric: false,
    disablePadding: false,
    label: 'Adjuster',
  },
  {
    id: 'adjusterClient',
    numeric: false,
    disablePadding: false,
    label: 'Client',
  },
  {
    id: 'claimNumber',
    numeric: false,
    disablePadding: false,
    label: 'Claim #',
  },
  {
    id: 'claimant',
    numeric: false,
    disablePadding: false,
    label: 'Claimant',
  },
  {
    id: 'therapistDisplayShort',
    numeric: false,
    disablePadding: false,
    label: 'Therapist',
  },
  {
    id: 'dos',
    numeric: false,
    disablePadding: false,
    label: 'DOS',
  },
  {
    id: 'serviceType',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'notesReceived',
    numeric: false,
    disablePadding: false,
    label: 'Notes',
  },
  {
    id: 'v1500',
    numeric: false,
    disablePadding: false,
    label: 'V1500',
  },
  {
    id: 'd1500Sent',
    numeric: false,
    disablePadding: false,
    label: 'D1500',
    enableEdit: true,
    inputType: 'date',
    // inputWidth: '10ch'
  },
  {
    id: 'adjusterRate',
    numeric: false,
    disablePadding: false,
    label: 'Adj.Rate',
    enableEdit: true,
    inputType: 'text',
    inputWidth: '8ch'
  },
];

function ReferralTableHead(props) {

  const { headCells, order, orderBy, onRequestSort, inlineEdit } = props;

  return (
    <TableHead>
      <TableRow>
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
      </TableRow>
    </TableHead>
  );
}

export default function D1500NotSentNew(props) {

    let { id: linkId } = useParams();

    const tableRef = useRef(null);

    const timestamp = new Date();

    const initialSort = 'claimant';

    const initialSortOrder = 'asc';

    const title = 'D1500 Not Sent';

    const inlineEdit = true;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetD1500NotSent();

    const rowsFiltered = rows?.sort((a, b) => -b[initialSort]?.localeCompare(a[initialSort]));

    // console.log(props);

    const { setPage: setNotesPage, setTab: setClaimTab, setBillMode, keepBillMode, setKeepBillMode } = useContext(SelectedClaimContext);
    const { setQuickSearchVal, setQuickSearchInputVal } = useContext(SearchContext);

    const mutationDelete = useDeleteReferral();
    const visitUpdate = useUpdateVisit();

    const [order, setOrder] = useState(initialSortOrder);
    const [orderBy, setOrderBy] = useState(initialSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const [editIDx, setEditIDx] = useState(-1);
    const [revertData, setRevertData] = useState({});
    const [currentEditRow, setCurrentEditRow] = useState({});

    // const [currentBulkEdit, setCurrentBulkEdit] = useState({});
    // const [selected, setSelected] = useState([]);
    // const [bulkModalOpen, setBulkModalOpen] = useState(false);
    // const [enabled, setEnabled] = useState({});

    const open = Boolean(anchorEl);

    const rowsSorted = rows?.sort((a, b) => {
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

    const handleClaimClicked = (event, claim) => {
        setNotesPage(0);
        setClaimTab(0);
        setQuickSearchVal(null);
        setQuickSearchInputVal('');
        if (claim.billingStatus === null || !keepBillMode) {
          setBillMode(false);
          setKeepBillMode(false);
        }
    };

    const handleOpenMenu = (event, id) => {
        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget?.parentNode);
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
        setAnchorEl(null);
        setDeleteId(null);
    };

    const startEditing = (i, row) => {
        console.log("start editing");
        // console.log(row);
        setEditIDx(i);
        setRevertData(row);
        setCurrentEditRow(row);
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

        // let newRow;
        // if (key === "needPN") {
        //     setNeedPNValue(!needPNvalue);
        //     newRow = {...currentEditRow, needPN: needPNvalue === false ? null : "Need PN"};
        //     // console.log(newRow);
        // }
        // else {
        //     newRow = {...currentEditRow, [key]: event.target.value === '' ? null : event.target.value};
        // }

        // console.log(key, newRow[key]);
        // TODO: debud needPN
        // console.log(event.target.value);
    }

    const stopEditing = (row) => {
        console.log("done editing");
        const keys = Object.keys(row);
        const changedKeys = keys.filter(index => row[index] !== currentEditRow[index]);
        const values = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: currentEditRow[key] }), {});
        values.billingId = row.billingId;
        // values.referralId = row.referralId;
        // values.assign = row.assign;
        console.log(values);
        Object.keys(values).length > 1 && visitUpdate.mutate(values);
        setEditIDx(-1);
        setRevertData({});
        setCurrentEditRow({});
    }

    return(
    <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          
            <Button variant="text" onClick={onDownload}>
              <DownloadIcon />
            </Button>

            <TableContainer sx={{ height: 400 }}>
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
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={(e, v) => handleRequestSort(e, v)}
                    />

                    <TableBody>
                        {rowsSorted &&
                        rowsSorted.map((row, index) => {

                        const labelId = `referrals-${title}-table-${index}`;

                        const currentlyEditing = editIDx === index;

                        // console.log(index);

                        return (
                            <TableRowStyled
                            hover
                            tabIndex={-1}
                            key={row.billingId}
                            id={labelId}
                            className={row.referralId === +linkId && 'selectedClaimRowDPT'}
                            >
                                {headCells.map((col) => {
                                
                                  return (
                                      <StyledTableCell sx={{ borderRight: 1 }} key={col.id} align="left">
                                        
                                          {col.id === 'claimNumber' 
                                          ?
                                          <Link to={`/${row.referralId}`} className='claimNumber-button' onClick={(event) => handleClaimClicked(event, row)}>
                                              {row.claimNumber}
                                          </Link>
                                          :
                                          <>
                                          {(col.enableEdit && currentlyEditing) 
                                          ?
                                          <input 
                                          type={col.inputType}
                                          name={col.id}
                                          value={currentEditRow[col.id] ? currentEditRow[col.id] : ''}
                                          onChange={(event) => handleChangeEdit(event, col.id)}
                                          style={{width: col.inputWidth || 'auto'}}
                                          />
                                          :
                                          row[col.id]
                                          }
                                          </>
                                          }
                                      </StyledTableCell>
                                )})}

                                
                                <StyledTableCell sx={{ borderRight: 1 }} align="left">
                                  
                                {currentlyEditing 
                                ?
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

                            </TableRowStyled>
                        );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {`${rows?.length} rows`}
        </Paper>
            <Menu
              id="delete-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={handleDeleteReferral}>
                  Delete referral?
              </MenuItem>

          </Menu>
    </Box>
    
    );
}