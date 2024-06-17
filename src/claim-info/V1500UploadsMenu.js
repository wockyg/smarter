import { useState, useContext } from 'react';
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
import ReplayIcon from '@mui/icons-material/Replay';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

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


  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState("v1500Id");

  const [hoverVals, setHoverVals] = useState([]);

  const { status: statusUploads, data: rows, error: errorUploads, isFetching: isFetchingUploads } = useGetV1500Uploads();

  const { uploadedFiles, v1500UploadProgress, v1500UploadComplete, v1500UploadFail } = useContext(SelectedClaimContext);

  // console.log("1", uploadedFiles[0])

  uploadedFiles.reverse()

  // console.log("2", uploadedFiles[0])
  // console.log("uploadedFiles", uploadedFiles)

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

    const setHoverVal = (i) => {
        
    };

    const clearHoverVal = (i) => {
      let temp = [...hoverVals]
      temp[i] = false
      setHoverVals(temp)
    };

  return( rowsSorted && uploadedFiles &&
    <List sx={{ width: '100%', maxHeight: 400, overflow: 'scroll', bgcolor: 'background.paper' }}>
      {/* pending initial upload */}
      {uploadedFiles.filter(u => !v1500UploadComplete?.includes(u.name) && !v1500UploadFail?.includes(u.name)).map((file, i) => {

        const labelId = `checkbox-list-label-${i}`;

         const progress = v1500UploadProgress.filename === file.name ? v1500UploadProgress.percentComplete : -1

        return (
          <ListItem
            key={i}
            secondaryAction={
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
                    {`${progress === -1 ? '0' : progress}%`}
                  </Typography>
                </Box>
              </Box>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={`${file.name}`} secondary={<LinearProgress />} />
            </ListItemButton>

            <br />
            
          </ListItem>
        )
      })}

      {/* pending webhook response */}
      {rowsSorted.filter(r => r.uploadProgress > -1 && r.uploadProgress < 100).map((row, i, a) => {
        const labelId = `checkbox-list-label-${row.v1500Id}`;
        return(
          <ListItem
            key={i}
            secondaryAction={
              (new Date().getTime() - new Date(row.dateAdded).getTime()) / 1000 < 30 ?
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
                <ReplayIcon />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={`${row.v1500Id} - ${row.original_filename}`} secondary={<LinearProgress />} />
            </ListItemButton>

            <br />
            
          </ListItem>
        )
      })}

      {/* failed initial upload */}
      {uploadedFiles.filter(u => v1500UploadFail?.includes(u.name)).map((file, i) => {

        const today = new Date().toJSON().slice(0, 10)
        const todayTime = new Date().toJSON().slice(11, 16)

        return(
          <ListItem
            key={i}
            secondaryAction={
              <IconButton>
                <WarningIcon color='error' />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={i} primary={`${file.name}`} secondary={`${today} @ ${todayTime} - upload failed womp womp`} />
            </ListItemButton>

            <br />
            
          </ListItem>
        )
      })}

      {/* completed uploads */}
      {rowsSorted.filter(r => r.uploadProgress === -1 || r.uploadProgress === 100).map((row, i, a) => {
        const labelId = `checkbox-list-label-${row.v1500Id}`;
        return(
          <ListItem
            key={i}
            secondaryAction={
              row.uploadProgress === -1 ?
              <IconButton>
                <WarningIcon color='error' />
              </IconButton>
              :
              <IconButton>
                <CheckCircleOutlineIcon color='success' />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} dense>
              <ListItemText id={labelId} primary={`${row.v1500Id} - ${row.original_filename}`} secondary={`${row.dateAddedFormat2}${row.uploadProgress === -1 ? ` - ${row.failureMessage}` : ''}`} />
            </ListItemButton>

            <br />
            
          </ListItem>
        )
      })}
    </List>
      
  );
}