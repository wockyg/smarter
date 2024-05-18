import { useState } from 'react';
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
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import MenuItem from '@mui/material/MenuItem';

import { visuallyHidden } from '@mui/utils';

import { styled } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WarningIcon from '@mui/icons-material/Warning';
import AddBoxIcon from '@mui/icons-material/AddBox';

import useGetV1500Uploads from '../hooks/useGetV1500Uploads';


export default function V1500UploadsMenu(props) {

  const { initialSort, 
          initialSortOrder, 
          title, 
          type, 
          cptRowsNotApproved, 
          filter, 
          handleFilter,
        } = props;


  const [order1, setOrder1] = useState('desc');
  const [orderBy1, setOrderBy1] = useState("v1500Id");
  const [order2, setOrder2] = useState('asc');
  const [orderBy2, setOrderBy2] = useState("uploadProgress");

  const [hoverVals, setHoverVals] = useState([]);

  const { status: statusUploads, data: rows, error: errorUploads, isFetching: isFetchingUploads } = useGetV1500Uploads();

  const rowsSorted = rows?.sort((a, b) => {
      const valueA = a[orderBy1] === null ? '' : (typeof a[orderBy1] === "string" ? a[orderBy1].toUpperCase() : a[orderBy1]);
      const valueB = b[orderBy1] === null ? '' : (typeof b[orderBy1] === "string" ? b[orderBy1].toUpperCase() : b[orderBy1]);
      if (order1 === 'asc') {
        if (valueA < valueB) {
          // console.log(`${valueA } < ${valueB}`);
          return -1;
        }
        if (valueA > valueB) {
          // console.log(`${valueA } > ${valueB}`);
          return 1;
        }
      }
      if (order1 === 'desc') {
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

    const rowsSorted2 = rowsSorted?.sort((a, b) => {
      const valueA = a[orderBy2] === null ? '' : (typeof a[orderBy2] === "string" ? a[orderBy2].toUpperCase() : a[orderBy2]);
      const valueB = b[orderBy2] === null ? '' : (typeof b[orderBy2] === "string" ? b[orderBy2].toUpperCase() : b[orderBy2]);
      if (order2 === 'asc') {
        if (valueA < valueB) {
          // console.log(`${valueA } < ${valueB}`);
          return -1;
        }
        if (valueA > valueB) {
          // console.log(`${valueA } > ${valueB}`);
          return 1;
        }
      }
      if (order2 === 'desc') {
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

    const setHoverVal = (i) => {
        
    };

    const clearHoverVal = (i) => {
      let temp = [...hoverVals]
      temp[i] = false
      setHoverVals(temp)
    };

  return(
    <List sx={{ width: '100%', maxHeight: 400, overflow: 'scroll', bgcolor: 'background.paper' }}>
      {rowsSorted2 && rowsSorted2.map((row, i, a) => {
        const labelId = `checkbox-list-label-${row.v1500Id}`;
        return(
          <ListItem
            key={i}
            secondaryAction={
              row.uploadProgress === -1 ?
              // <Tooltip title={row.failureMessage}>
                <WarningIcon />
              // </Tooltip>
              :
              row.uploadProgress < 100 ?
              <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                {/* <CircularProgress /> */}
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
                    {`${Math.round(row.uploadProgress)}%`}
                  </Typography>
                </Box>
              </Box>
              :
              <IconButton>
                <CheckCircleOutlineIcon color='success' />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={`${row.v1500Id} - ${row.original_filename}`} secondary={(row.uploadProgress < 100 && row.uploadProgress > -1) ? <LinearProgress /> : `${row.dateAddedFormat2}${row.uploadProgress === -1 ? ` - ${row.failureMessage}` : ''}`} />
            </ListItemButton>

            {/* {row.v1500Id}
            {row.original_filename}
            {row.dateAddedFormat}
            {row.uploadNanonetsStatus}
            {row.extractionStatus}
            {row.uploadSmarterStatus}
            {row.fileMoveStatus} */}
            <br />
            

          </ListItem>
        )
      })}
    </List>
      
  );
}