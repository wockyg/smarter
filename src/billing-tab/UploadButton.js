import { useState, useContext, useRef, Fragment } from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';

import DownloadingIcon from '@mui/icons-material/Downloading';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import useGetV1500Uploads from '../hooks/useGetV1500Uploads';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { green } from '@mui/material/colors';

export default function UploadButton(props) {

  const { status: statusUploads, data: rows, error: errorUploads, isFetching: isFetchingUploads } = useGetV1500Uploads();

  const { uploadedFiles } = useContext(SelectedClaimContext);

  const numPending = rows?.filter(r => r.uploadProgress < 100 && r.uploadProgress > -1).length + uploadedFiles.length

  const numFailed = rows?.filter(r => r.uploadProgress === -1).length

  // const buttonSx = {
  //       ...(success && {
  //       bgcolor: green[500],
  //       '&:hover': {
  //           bgcolor: green[700],
  //       },
  //       }),
  //   };

  return (
    rows && 
    
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ m: 1, position: 'relative' }}>
          
            <Fab
            aria-label="save"
            color="primary"
            // sx={buttonSx}
            onClick={props?.handleClickUpload}
            >
              {(numPending > 0 || numFailed > 0) ?
              <Badge badgeContent={numPending > 0 ? numPending : numFailed} color={numPending > 0 ? "success" : "error"}>
                <UploadFileIcon />
              </Badge>
              :
              <UploadFileIcon />
              }
            </Fab>
            
            {numPending > 0 && (
            <CircularProgress
                size={68}
                sx={{
                color: green[500],
                position: 'absolute',
                top: -6,
                left: -6,
                zIndex: 1,
                }}
            />
            )}
        </Box>
    </Box>
  );
  
};