import { useState, useContext } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MergeIcon from '@mui/icons-material/Merge';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SaveIcon from '@mui/icons-material/Save';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import useGetD1500Status from '../hooks/useGetD1500Status';


export default function D1500ProgressStepper() {

  const { pendingD1500Id, setPendingD1500Id, pendingD1500Upload } = useContext(SelectedClaimContext);

  const { status, data: d1500Status, error, isFetching } = useGetD1500Status(pendingD1500Id || 0);

  // console.log(d1500Status)

  // const { matchStatus, mergeStatus, saveD1500Status, moveV1500Status } = d1500Status

  // const matchStatus = "success"
  // const mergeStatus = "pending"
  // const moveV1500Status = null
  // const saveD1500Status = null

  const handleCloseStepper = () => {
    setPendingD1500Id(null)
  }

  return (
    (d1500Status || pendingD1500Upload) &&
    <>
    <Paper elevation={3} sx={{padding: 1, background: '#CFCFCF'}}>
      <Grid container spacing={1}>
        {/* uploadStatus indicator */}
         <Grid item>
          {d1500Status.uploadStatus === null &&
          <CloudUploadIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.uploadStatus === 'pending' &&
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
                <CloudUploadIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
              </Typography>
            </Box>
          </Box>
          }
          {d1500Status.uploadStatus === 'failed' &&
          <CloudUploadIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.uploadStatus === 'success' &&
          <CloudUploadIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
          }
        </Grid>
        <Grid item>
          <KeyboardDoubleArrowRightIcon />
        </Grid>
        {/* matchStatus indicator */}
        <Grid item>
          {d1500Status.matchStatus === null &&
          <FindInPageIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.matchStatus === 'pending' &&
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
                <FindInPageIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
              </Typography>
            </Box>
          </Box>
          }
          {d1500Status.matchStatus === 'failed' &&
          <FindInPageIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.matchStatus === 'success' &&
          <FindInPageIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
          }
        </Grid>
        <Grid item>
          <KeyboardDoubleArrowRightIcon />
        </Grid>
        {/* mergeStatus indicator */}
        <Grid item>
          {d1500Status.mergeStatus === null &&
          <MergeIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.mergeStatus === 'pending' &&
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
                <MergeIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
              </Typography>
            </Box>
          </Box>
          }
          {d1500Status.mergeStatus === 'failed' &&
          <MergeIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.mergeStatus === 'success' &&
          <MergeIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
          }
        </Grid>
        <Grid item>
          <KeyboardDoubleArrowRightIcon />
        </Grid>
        {/* moveV1500Status indicator */}
        <Grid item>
          {d1500Status.moveV1500Status === null &&
          <DriveFileMoveIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.moveV1500Status === 'pending' &&
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
                <DriveFileMoveIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
              </Typography>
            </Box>
          </Box>
          }
          {d1500Status.moveV1500Status === 'failed' &&
          <DriveFileMoveIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.moveV1500Status === 'success' &&
          <DriveFileMoveIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
          }
        </Grid>
        <Grid item>
          <KeyboardDoubleArrowRightIcon />
        </Grid>
        {/* saveD1500Status indicator */}
        <Grid item>
          {d1500Status.saveD1500Status === null &&
          <SaveIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.saveD1500Status === 'pending' &&
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
                <SaveIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
              </Typography>
            </Box>
          </Box>
          }
          {d1500Status.saveD1500Status === 'failed' &&
          <SaveIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
          }
          {d1500Status.saveD1500Status === 'success' &&
          <SaveIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
          }
        </Grid>
      </Grid>
    </Paper>
    <Button onClick={() => handleCloseStepper()}>Ok</Button>
    </>
  
  );
}