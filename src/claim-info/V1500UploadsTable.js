import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { visuallyHidden } from '@mui/utils';

import { styled } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useState } from 'react';

function ReferralTableHead(props) {

  const { headCells, order, orderBy, onRequestSort, removable, rows } = props;

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
              // onClick={(e) => onRequestSort(e, headCell.id)}
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
        
        {removable &&
        <TableCell />
        }
        
      </TableRow>
    </TableHead>
  );
}

const TableRowStyled = styled(TableRow)`
    &:nth-of-type(even) {
    background-color: #F0F0F0;
    }

    cursor: pointer

`;

const StyledTableCell = styled(TableCell)({
    padding: '5px 0px 5px 2px', 
    // paddingLeft: 5,
    // paddingRight: 5,
    fontSize: 11,
});

export default function V1500UploadsTable(props) {

  const { rows, 
          headCells, 
          initialSort, 
          initialSortOrder, 
          removable, 
          title, 
          type, 
          cptRowsNotApproved, 
          filter, 
          handleFilter,
        } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const [order, setOrder] = useState(initialSortOrder || 'asc');
  const [orderBy, setOrderBy] = useState(initialSort);

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


  const handleOpenUpload = () => {
      console.log('UPLOAD');
      // open modal
      setModalType('upload')
      setModalOpen(true);
      
  };
  

  return(
      <>  
      <IconButton onClick={handleOpenUpload}>
          <UploadFileIcon />
      </IconButton>

      <TableContainer sx={{ height: 400 }}>
        <Table
        stickyHeader
        // sx={{ minWidth: 750 }}
        size="small" 
        aria-label={`v1500Uploads-table`}
        // ref={tableRef}
        >
          <ReferralTableHead
          headCells={headCells}
          removable={removable}
          rows={rows}
          order={order}
          orderBy={orderBy}
          // onRequestSort={(e, v) => handleRequestSort(e, v)}
          />

          <TableBody>
            {rowsSorted.map((row, i, a) => {
              return(
                <TableRowStyled
                hover
                tabIndex={-1}
                key={i}
                // id={labelId}
                // className={''}
                // onClick={(e) => type === 'hcfa' && handleClickHcfa(e, row)}
                >
                  {/* {headCells.filter(c => c.id !== 'extractionStatus').map((col, j, a2) => {
                    return(
                      <StyledTableCell sx={{ borderRight: 1 }} key={col.id} align="left">
                        {row[col.id]}
                      </StyledTableCell>
                    )
                  })} */}

                  <StyledTableCell sx={{ borderRight: 1 }} align="left">
                    {row.v1500Id}
                  </StyledTableCell>

                  <StyledTableCell sx={{ borderRight: 1 }} align="left">
                    {row.original_filename}
                  </StyledTableCell>

                  <StyledTableCell sx={{ borderRight: 1 }} align="left">
                    {row.dateAdded}
                  </StyledTableCell>

                  <StyledTableCell sx={{ borderRight: 1 }} align="left">
                    {row.uploadNanonetsStatus === 'pending' &&
                    <CircularProgress size={15} />
                    }

                    {row.uploadNanonetsStatus === 'Success' &&
                    <CheckCircleOutlineIcon color='success' />
                    }

                    {row.uploadNanonetsStatus === 'failed' &&
                    <WarningIcon color='error' />
                    }
                  </StyledTableCell>

                  <StyledTableCell sx={{ borderRight: 1 }} align="left">
                    {row.extractionStatus === 'pending' &&
                    <CircularProgress size={15} />
                    }

                    {row.extractionStatus === 'Success' &&
                    <CheckCircleOutlineIcon color='success' />
                    }

                    {row.extractionStatus === 'failed' &&
                    <WarningIcon color='error' />
                    }
                  </StyledTableCell>

                  <StyledTableCell sx={{ borderRight: 1 }} align="left">
                    {row.uploadSmarterStatus === 'pending' &&
                    <CircularProgress size={15} />
                    }

                    {row.uploadSmarterStatus === 'Success' &&
                    <CheckCircleOutlineIcon color='success' />
                    }

                    {row.uploadSmarterStatus === 'failed' &&
                    <WarningIcon color='error' />
                    }
                  </StyledTableCell>

                  <StyledTableCell sx={{ borderRight: 1 }} align="left">
                    {row.fileMoveStatus === 'pending' &&
                    <CircularProgress size={15} />
                    }

                    {row.fileMoveStatus === 'Success' &&
                    <CheckCircleOutlineIcon color='success' />
                    }

                    {row.fileMoveStatus === 'failed' &&
                    <WarningIcon color='error' />
                    }
                  </StyledTableCell>
                  
                </TableRowStyled>
              )
            })}
          </TableBody>
          
        </Table>
      </TableContainer>
      </>
  );
}