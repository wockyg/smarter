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
import { visuallyHidden } from '@mui/utils';

import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';

import { styled } from '@mui/material';

import { Link } from 'react-router-dom';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import { SearchContext } from '../contexts/SearchContext';

import { stableSort, getComparator, handleRequestSort, handleChangePage, handleChangeRowsPerPage } from './TableComponents';

import { useDownloadExcel } from 'react-export-table-to-excel';
import useDeleteReferral from '../hooks/useDeleteReferral';

import { useParams } from 'react-router-dom';

import './ReferralTable.css'

function ReferralTableHead(props) {

  const { headCells, order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
              onClick={createSortHandler(headCell.id)}
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

export default function ReferralTable(props) {

    let { id: linkId } = useParams();

    const tableRef = useRef(null);

    const timestamp = new Date();

    const { rows, headCells, filter, initialSort, initialSortOrder, removable, title } = props;

    const { setPage: setNotesPage, setTab: setClaimTab } = useContext(SelectedClaimContext);
    const { setQuickSearchVal, setQuickSearchInputVal } = useContext(SearchContext);

    const mutationDelete = useDeleteReferral();

    const [order, setOrder] = useState(initialSortOrder);
    const [orderBy, setOrderBy] = useState(initialSort);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);

    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const open = Boolean(anchorEl);

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

    const handleClaimClicked = (event, claim) => {
        setNotesPage(0);
        setClaimTab(0);
        setQuickSearchVal(null);
        setQuickSearchInputVal('');
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
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={(e, v) => handleRequestSort(v, orderBy, order, setOrder, setOrderBy)}
                    />
                    <TableBody>
                        {stableSort(rows ? rows : [], getComparator(order, orderBy))
                        .map((row, index) => {

                        const labelId = `referrals-${title}-table-${index}`;

                        return (
                            <TableRowStyled
                            hover
                            tabIndex={-1}
                            key={props.type === 'bil' ? row.billingId : row.referralId}
                            id={labelId}
                            className={row.referralId === +linkId ? (row.serviceGeneral === "FCE" ? 'selectedClaimRowFCE' : 'selectedClaimRowDPT') : (row.serviceGeneral === "FCE" && 'regularRowFCE')}
                            >
                                {headCells.map((col) => (
                                    <StyledTableCell sx={{ borderRight: 1 }} key={col.id} align="left">
                                        {col.id === 'claimNumber' ?
                                        <Link to={`/${row.referralId}`} className='claimNumber-button' onClick={(event) => handleClaimClicked(event, row)}>
                                            {row.claimNumber}
                                        </Link>
                                        :
                                        <>{row[col.id]}</>
                                        }
                                    </StyledTableCell>
                                )
                                )}
                                {removable &&
                                <StyledTableCell sx={{ borderRight: 1 }} align="left">
                                  <div className="buttonContainer">
                                    <DeleteIcon onClick={(e) => handleOpenMenu(e, row.referralId)} />
                                  </div>
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
              <MenuItem onClick={handleDeleteReferral}>
                  Delete referral?
              </MenuItem>

          </Menu>
    </Box>
    
    );
}