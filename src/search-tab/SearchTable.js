import { useState, useContext, useRef } from 'react';

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

import { SearchContext } from '../contexts/SearchContext';
import { DetailsContext } from '../contexts/DetailsContext';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useDownloadExcel } from 'react-export-table-to-excel';


import { useNavigate } from "react-router-dom";

import PropTypes from 'prop-types';

import { styled } from '@mui/material';

import { stableSort, getComparator, handleRequestSort, handleChangePage, handleChangeRowsPerPage } from '../table-components/TableComponents';

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const handleRequestSort = (property, orderBy, order, setOrder, setOrderBy) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
// };

// const handleChangePage = (newPage, setPage) => {
//     setPage(newPage);
// };

// const handleChangeRowsPerPage = (event, setRowsPerPage, setPage) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
// };

function SearchTableHead(props) {

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

SearchTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function SearchTable(props) {

    const tableRef = useRef(null);

    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: 'Test table',
        sheet: 'Users'
    })

    const timestamp = new Date();

    const navigate = useNavigate();

    const { party, searchVal, rows, headCells, initialSort } = props;

    const { searchId, setSearchId } = useContext(SearchContext);

    const { setCurrentlyEditingSearch: setCurrentlyEditing } = useContext(DetailsContext);

    const { tab, setTab } = useContext(SelectedClaimContext);

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState(initialSort ? initialSort : '');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleClickRow = (row) => {
      console.log("switch selected row");
      party !== 'referral' ? setSearchId(row[`${party}Id`]) : navigate(`/${row.referralId}`)
      // party === 'referral' && setTab(0);
      // setCurrentEditRow({});
      setCurrentlyEditing(false);
    }

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
            <TableContainer sx={{maxHeight: 350}}>
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
                    onRequestSort={(e, v) => handleRequestSort(v, orderBy, order, setOrder, setOrderBy)}
                    />
                    <TableBody>
                    {stableSort(rows ? rows : [], getComparator(order, orderBy))
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
                            sx={{ backgroundColor: row.serviceGeneral && row.serviceGeneral === "FCE" ? "#D8BFD8" : (row[`${party}Id`] === searchId ? "#E6E6E6" : "white")}}
                            >
                                {headCells.map((col) => (
                                    <StyledTableCell sx={{ borderRight: 1 }} key={col.id} align="left">{row[col.id]}</StyledTableCell>
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
        {searchVal !== '' &&
            <TablePagination
            rowsPerPageOptions={[25, 100, 250]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, v) => handleChangePage(v, setPage)}
            onRowsPerPageChange={(e) => handleChangeRowsPerPage(e, setRowsPerPage, setPage)}
            />
            }
    </Box>
    );
}