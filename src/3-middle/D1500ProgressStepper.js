import { useState, useContext } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import MergeIcon from '@mui/icons-material/Merge';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SaveIcon from '@mui/icons-material/Save';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';


export default function D1500ProgressStepper() {

  const { d1500Id, setD1500Id, d1500Status } = useContext(SelectedClaimContext);

  const { matchStatus, mergeStatus, saveD1500Status, moveV1500Status } = d1500Status

  // console.log(d1500Status)

    return (
      <Paper elevation={3} sx={{padding: 1, background: '#CFCFCF'}}>
        <Grid container spacing={1}>
          <Grid item>
            {/* matchStatus indicator */}
            {matchStatus === null &&
            <FindInPageIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
            }
            {matchStatus === 'pending' &&
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
            {matchStatus === 'failed' &&
            <FindInPageIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
            }
            {matchStatus === 'success' &&
            <FindInPageIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
            }
          </Grid>
          <Grid item>
            <KeyboardDoubleArrowRightIcon />
          </Grid>
          <Grid item>
            {/* mergeStatus indicator */}
            {mergeStatus === null &&
            <MergeIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
            }
            {mergeStatus === 'pending' &&
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
            {mergeStatus === 'failed' &&
            <MergeIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
            }
            {mergeStatus === 'success' &&
            <MergeIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
            }
          </Grid>
          <Grid item>
            <KeyboardDoubleArrowRightIcon />
          </Grid>
          <Grid item>
            {/* moveV1500Status indicator */}
            {moveV1500Status === null &&
            <DriveFileMoveIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
            }
            {moveV1500Status === 'pending' &&
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
            {moveV1500Status === 'failed' &&
            <DriveFileMoveIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
            }
            {moveV1500Status === 'success' &&
            <DriveFileMoveIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
            }
          </Grid>
          <Grid item>
            <KeyboardDoubleArrowRightIcon />
          </Grid>
          <Grid item>
            {/* saveD1500Status indicator */}
            {saveD1500Status === null &&
            <SaveIcon fontSize='large' sx={{padding: 0.5, borderRadius: 5}} />
            }
            {saveD1500Status === 'pending' &&
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
            {saveD1500Status === 'failed' &&
            <SaveIcon fontSize='large' sx={{background: '#ED534A', padding: 0.5, borderRadius: 5}} />
            }
            {saveD1500Status === 'success' &&
            <SaveIcon fontSize='large' sx={{background: '#27C917', padding: 0.5, borderRadius: 5}} />
            }
          </Grid>
        </Grid>
      </Paper>
    
    );
}