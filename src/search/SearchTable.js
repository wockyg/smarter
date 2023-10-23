import { useState, useContext, useRef, Fragment } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { SearchContext } from '../contexts/SearchContext';
import { DetailsContext } from '../contexts/DetailsContext';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useDownloadExcel } from 'react-export-table-to-excel';


import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import { styled } from '@mui/material';

import { useParams } from 'react-router-dom';

// import { stableSort, getComparator, handleRequestSort, handleChangePage, handleChangeRowsPerPage } from '../table-components/TableComponents';

import '../table-components/ReferralTable.css';

function SearchTableHead(props) {

  const { headCells, order, orderBy, onRequestSort } = props;

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
      </TableRow>
    </TableHead>
  );
}

SearchTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function SearchTable(props) {

  let { id: linkId } = useParams();

    const tableRef = useRef(null);

    const timestamp = new Date();

    const navigate = useNavigate();

    const { party, searchVal, searchValAdvanced, rows, headCells, initialSort, title } = props;

    const { searchId, setSearchId, setQuickSearchVal, setQuickSearchInputVal } = useContext(SearchContext);

    const { setCurrentlyEditingSearch: setCurrentlyEditing } = useContext(DetailsContext);

    const { tab, setTab } = useContext(SelectedClaimContext);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(initialSort ? initialSort : '');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const rowsSorted = rows && rows?.sort((a, b) => {
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
        filename: `${title} Search ${timestamp}`,
        sheet: 'Sheet1'
    });

    const handleClickRow = (row) => {
      console.log("switch selected row");
      party !== 'referral' ? setSearchId(row[`${party}Id`]) : navigate(`/${row.referralId}`)
      if (party === 'referral') {
        setQuickSearchVal(null);
        setQuickSearchInputVal('');
        // setTab(0);
      }
      setCurrentlyEditing(false);
    }

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    const handleChangePage = (newPage, setPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event, setRowsPerPage, setPage) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const StyledTableCell = styled(TableCell)({
        padding: '5px', 
        // paddingLeft: 5,
        // paddingRight: 5,
        fontSize: 11,
    })

    return (
    <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <DownloadIcon onClick={onDownload} />
            <TableContainer sx={{height: 450}}>
                <Table
                stickyHeader
                sx={{ minWidth: 750 }}
                aria-labelledby={`${party}SearchTable`}
                size='small'
                ref={tableRef}
                >
                    <SearchTableHead
                    headCells={headCells}
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={(e, v) => handleRequestSort(e, v)}
                    />
                    <TableBody>
                    {rowsSorted && rowsSorted
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {

                        const labelId = `${party}Search-table-${index}`;

                        return (
                            <TableRow
                            hover
                            onClick={() => handleClickRow(row)}
                            tabIndex={-1}
                            key={row[`${party}Id`]}
                            id={labelId}
                            className={row.referralId ? (row.referralId === +linkId ? (row.service === "FCE" ? 'selectedClaimRowFCE' : 'selectedClaimRowDPT') : (row.service === "FCE" ? 'regularRowFCE' : '')) : ((party === 'therapist' && row.therapistId === searchId) ? 'clickedRow' : (row.doNotUseDPT ? 'doNotUse' : ''))}
                            // sx={{ backgroundColor: row.serviceGeneral && row.serviceGeneral === "FCE" ? "#D8BFD8" : (row[`${party}Id`] === searchId ? "#E6E6E6" : "white")}}
                            >
                                {headCells.map((col) => (
                                  <Fragment key={col.id}>
                                  {((col.id === 'dpt' && row.dpt === 'DPT') || (col.id === 'fce' && row.fce === 'FCE') || (col.id === 'ppd' && row.ppd === 'PPD')) ?
                                  <StyledTableCell sx={{ borderRight: 1 }} key={col.id} align="center">
                                  <CheckCircleOutlineIcon fontSize='small' />
                                  </StyledTableCell>
                                  :
                                  <StyledTableCell sx={{ borderRight: 1 }} key={col.id} align="left">
                                  {row[col.id]}
                                  </StyledTableCell>
                                  }
                                  </Fragment>
                                )
                                )}
                            </TableRow>
                        );
                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 33 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
        
            <TablePagination
            rowsPerPageOptions={[25, 100, 250]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, v) => handleChangePage(v, setPage)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage(e, setRowsPerPage, setPage)}
            />
            
    </Box>
    );
}