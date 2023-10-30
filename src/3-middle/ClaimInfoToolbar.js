import { useState, useContext } from 'react';

import Badge from 'react-bootstrap/Badge';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import RuleIcon from '@mui/icons-material/Rule';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import LanguageIcon from '@mui/icons-material/Language';
import TranslateIcon from '@mui/icons-material/Translate';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InterpreterModeIcon from '@mui/icons-material/InterpreterMode';

import useGetReferral from '../hooks/useGetReferral';
import useUpdateReferral from '../hooks/useUpdateReferral';

import { useParams } from 'react-router-dom';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';


export default function ClaimInfoToolbar() {

    const [anchorEl0, setAnchorEl0] = useState(null);
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);
    const [removeField, setRemoveField] = useState(null);
    const [editClaimNumber, setEditClaimNumber] = useState(false);
    const [tempClaimNumber, setTempClaimNumber] = useState('');

    const open0 = Boolean(anchorEl0);
    const open1 = Boolean(anchorEl1);
    const open2 = Boolean(anchorEl2);

    let { id: linkId } = useParams();

    const { billMode, setBillMode, keepBillMode, setKeepBillMode } = useContext(SelectedClaimContext);

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    const mutationUpdate = useUpdateReferral();

    const handleOpenMenu = (event, n, f) => {
      f && setRemoveField(f);
      if (n === 0) {
        setAnchorEl0(event.currentTarget);
        setAnchorEl1(null);
        setAnchorEl2(null);
      }
      else if (n === 1) {
        setAnchorEl0(null);
        setAnchorEl1(event.currentTarget);
        setAnchorEl2(null);
      }
      else if (n === 2) {
        setAnchorEl0(null);
        setAnchorEl1(null);
        setAnchorEl2(event.currentTarget);
      }
    };

    const handleCloseMenu = () => {
        setAnchorEl0(null);
        setAnchorEl1(null);
        setAnchorEl2(null);
        // setFieldSwap("");
        // setFieldRemove("");
    };

    const handleUpdate = (field, value) => {
      let values = {
        referralId: selectedClaim.referralId,
        [field]: value ? value : null
      }
      if (field === "fuHoldNotes") {
        values.ptStatus = "Active";
      }
      mutationUpdate.mutate(values);
      handleCloseMenu();
    };

    const handleUpdateClaimNumber = () => {
      setEditClaimNumber(!editClaimNumber);
      setTempClaimNumber(selectedClaim.claimNumber)
      handleCloseMenu();
    };

    const handleChangeClaimNumber = (event) => {
      setTempClaimNumber(event.target.value)
      handleCloseMenu();
    };

    const cancelEdit = (event) => {
      setTempClaimNumber('');
      setEditClaimNumber(false);
      handleCloseMenu();
    };

    const stopEditing = () => {
        console.log("done editing");
        const changedValue = tempClaimNumber !== selectedClaim.claimNumber;
        changedValue && mutationUpdate.mutate({referralId: selectedClaim.referralId, claimNumber: tempClaimNumber});
        setTempClaimNumber('');
        setEditClaimNumber(false);
    };

    const handleToggleBillMode = (e, v) => {
        // console.log(e.target);
        setBillMode(!billMode);
    };

     const handleChangeKeepBillMode = (e, v) => {
        setKeepBillMode(!keepBillMode);
    };

    return (
      <>
      {selectedClaim?.referralId &&
      <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          
          <Grid container spacing={1.5}>
            <Grid item>
              <h3>
                <Badge bg="secondary">
                    {`${selectedClaim.claimant} | `}
                    {editClaimNumber ?
                    <Grid container>
                        <Grid item>
                          <input 
                          type='text'
                          name='claimNumber'
                          value={tempClaimNumber ? tempClaimNumber : ''}
                          onChange={(event) => handleChangeClaimNumber(event)}
                          style={{width: '15ch'}}
                          />
                        </Grid>
                        <Grid item>
                            <CheckIcon
                            sx={{cursor: "pointer"}}
                            fontSize='small'
                            onClick={() => stopEditing()}
                            />
                        </Grid>
                        <Grid item>
                            <ClearIcon
                            sx={{cursor: "pointer"}}
                            fontSize='small'
                            onClick={() => cancelEdit()}
                            />
                        </Grid>
                    </Grid>
                    :
                    <div style={{cursor: 'pointer'}} onClick={(e) => handleOpenMenu(e, 2)}>
                    <u>
                    {selectedClaim.claimNumber 
                    ?
                    `${selectedClaim.claimNumber}`
                    :
                    'WILL GET'
                    }
                    </u>
                    </div>
                    }
                </Badge>
              </h3>
            </Grid>
            <Grid item>
              <IconButton onClick={(e) => handleOpenMenu(e, 0)}>
                <MoreVertIcon />
              </IconButton>
            </Grid>
            {selectedClaim?.billingStatus && selectedClaim?.serviceGeneral === 'DPT' &&
            <>
            <Grid item>
              <ToggleButtonGroup
              size="small"
              value={billMode}
              exclusive
              onChange={handleToggleBillMode}
              aria-label="billMode"
              >
                <ToggleButton value={false} aria-label="non-billMode">
                  <InfoIcon fontSize='small' />
                </ToggleButton>
                <ToggleButton value={true} aria-label="billMode">
                  <PreviewIcon fontSize='small' /><FormatListNumberedIcon fontSize='small' />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            {billMode &&
            <Grid item>
              <FormControlLabel
              control=
              {
              <IconButton aria-label="LockBillMode">
                <Switch 
                size="small" 
                checked={keepBillMode}
                onChange={handleChangeKeepBillMode}
                />
              </IconButton>
              }
              label="Lock BillMode" />
            </Grid>
            }
            </>
            }
            {selectedClaim?.spanishSpeaking &&
            <Grid item>
              <h3>
                <IconButton onClick={(e) => handleOpenMenu(e, 1, 'spanishSpeaking')}>
                  <Badge bg="success">
                      {selectedClaim.spanishSpeaking}
                  </Badge>
                </IconButton>
              </h3>
            </Grid>
            }
            {selectedClaim?.translationNeeded &&
            <Grid item>
              <IconButton onClick={(e) => handleOpenMenu(e, 1, 'translationNeeded')}>
                <Badge bg="primary">
                  <InterpreterModeIcon />
                </Badge>
              </IconButton>
            </Grid>
            }
            {selectedClaim?.transportNeeded &&
            <Grid item>
              <h3>
                <IconButton onClick={(e) => handleOpenMenu(e, 1, 'transportNeeded')}>
                  <Badge bg="primary">
                    <DirectionsCarIcon />
                  </Badge>
                </IconButton>
              </h3>
            </Grid>
            }

            {(selectedClaim?.ptStatus === "Follow-Up" || selectedClaim?.ptStatus === "Hold") &&
            <Grid item>
              <h3>
                <IconButton onClick={(e) => handleOpenMenu(e, 1, 'fuHoldNotes')}>
                  <Badge bg="danger">
                    {selectedClaim?.fuHoldNotes}
                  </Badge>
                </IconButton>
              </h3>
            </Grid>
            }
          </Grid>
        </Box>
      </Box>
      <Menu
        id="extras-add-menu"
        anchorEl={anchorEl0}
        open={open0}
        onClose={handleCloseMenu}
      >
        {!selectedClaim.transportNeeded && 
        <MenuItem  onClick={() => handleUpdate('transportNeeded', "Transport Needed")}>
            Need Transportation
        </MenuItem>
        }
        {!selectedClaim.translationNeeded &&
        <MenuItem  onClick={() => handleUpdate('translationNeeded', "Translation Needed")}>
            Need Translation
        </MenuItem>
        }
        {!selectedClaim.spanishSpeaking &&
        <MenuItem  onClick={() => handleUpdate('spanishSpeaking', "Spanish Only")}>
            Spanish Only
        </MenuItem>
        }
            
      </Menu>
      <Menu
      id="extras-remove-menu"
      anchorEl={anchorEl1}
      open={open1}
      onClose={handleCloseMenu}
      >
      
        <MenuItem  onClick={() => handleUpdate(removeField)}>
            {removeField === 'fuHoldNotes' ? "Move back to 'Active'" : "Remove"}
        </MenuItem>
  
      </Menu>
      <Menu
      id="extras-remove-menu"
      anchorEl={anchorEl2}
      open={open2}
      onClose={handleCloseMenu}
    >
      
        <MenuItem  onClick={() => handleUpdateClaimNumber()}>
            Update Claim Number
        </MenuItem>
  
      </Menu>
      </>
      }
      </>
    
    );
}