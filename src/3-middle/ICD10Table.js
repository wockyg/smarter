import React, { useContext, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import useGetReferral_icd10 from '../hooks/useGetReferral_icd10';
import useAddReferral_icd10 from '../hooks/useAddReferral_icd10';
import useDeleteReferral_icd10 from '../hooks/useDeleteReferral_icd10';

// import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { Tooltip } from '@mui/material';
import { ICD10Codes } from '../lookup-tables/lookup_ICD10_2019';

import useGetReferral from '../hooks/useGetReferral';

import { useParams } from 'react-router-dom';

export default function ICD10Table() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const { status, data: codes, error, isFetching } = useGetReferral_icd10(selectedClaim?.referralId);

  // console.log(codes);

  const mutationAdd = useAddReferral_icd10();

  const mutationRemove = useDeleteReferral_icd10();

  const [newCode, setNewCode] = useState(null);
  const [newCodeInput, setNewCodeInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (newCode?.length > 0) {
      setOpen(true);
    }
  };

  const handleInputChange = (event, newInputValue) => {
    setNewCodeInput(newInputValue);
    if (newInputValue.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  const handleChange = (event, newValue) => {
    setNewCode(newValue);
    setOpen(false);
    console.log(newCode);
  };

  const handleAddCode = () => {
    console.log("Add icd10 code...");
    mutationAdd.mutate({ referralId: `${selectedClaim?.referralId}`, icd10: `${newCode.ICD10}`, description: `${newCode.DisplayString}` });
    setNewCode(null);
  }

  return (
    <div>

      {/* {mutationAdd.isLoading ? (
         'Adding code...'
       ) : (
         <>
           {mutationAdd.isError ? (
             <div>An error occurred: {mutationAdd.error.message}</div>
           ) : null}
 
           {mutationAdd.isSuccess ? <div>New code added: {mutationAdd.data}</div> : null}
         </>
       )} */}


      {selectedClaim &&
      <Grid container spacing={2}>
        <Grid item>
          <Autocomplete
          size='small'
          value={newCode}
          open={open}
          onOpen={handleOpen}
          onClose={() => setOpen(false)}
          onChange={handleChange}
          inputValue={newCodeInput}
          onInputChange={handleInputChange}
          id="addCode-autocomplete"
          options={ICD10Codes}
          getOptionLabel={(option) => option?.ICD10 || ''}
          sx={{ width: 175 }}
          renderInput={(params) => <TextField {...params} label="Add ICD10" />}
          />
        </Grid>
        <Grid item>
          <Button 
          disabled={newCode?.ICD10 ? false : true}
          variant='contained' 
          onClick={handleAddCode}>
          +
          </Button>
        </Grid>
      </Grid>
      }
      
      {selectedClaim && 
      <TableContainer component={Paper} sx={{height: 80}}>
        <Table aria-label="simple table" size='small'>
          <TableBody>
            {codes && codes.filter(row => row?.referralId === selectedClaim?.referralId).map((row, index) => {
              const rank = index + 1;
              const letter = (rank + 9).toString(36).toUpperCase();
              // console.log(letter);
              return(
                <TableRow
                    key={row?.icd10}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="left" sx={{border: 1}}>{letter}</TableCell>
                    <Tooltip title={row?.description}>
                    <TableCell align="left" sx={{border: 1}}>{row?.icd10}</TableCell>
                    </Tooltip>
                    <TableCell align="left">
                      <button 
                      onClick={() => {
                        mutationRemove.mutate({ referralId: `${selectedClaim?.referralId}`, icd10: `${row?.icd10}` });
                      }}
                      variant="outlined">x</button>
                    </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      }
    </div>
  )
}