import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';
import { services } from '../lookup-tables/lookup_service';
import { handleChangeSearch, handleClearSearch, handleClearEntireSearch } from '../7-util/HelperFunctions';

import Paper from '@mui/material/Paper';

import useGetClaimantsDropdown from '../hooks/useGetClaimantsDropdown';
import useGetEmployersDropdown from '../hooks/useGetEmployersDropdown';

export default function ClaimantSearchBar(props) {

    const {searchVal, setSearchVal} = props;

    const { status: statusClaimants, data: claimants, error: errorClaimants, isFetching: isFetchingClaimants } = useGetClaimantsDropdown();
    const { status: statusEmployers, data: employers, error: errorEmployers, isFetching: isFetchingEmployers } = useGetEmployersDropdown();

    const claimantsSorted = claimants && claimants?.sort((a, b) => {
      const valueA = a.lastName === null ? '' : (typeof a.lastName === "string" ? a.lastName.toUpperCase() : a.lastName);
      const valueB = b.lastName === null ? '' : (typeof b.lastName === "string" ? b.lastName.toUpperCase() : b.lastName);
      if (valueA > valueB) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueA < valueB) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      // values must be equal
      return 0;
    });

    const employersSorted = employers && employers?.sort((a, b) => {
      const valueA = a.name === null ? '' : (typeof a.name === "string" ? a.name.toUpperCase() : a.name);
      const valueB = b.name === null ? '' : (typeof b.name === "string" ? b.name.toUpperCase() : b.name);
      if (valueA > valueB) {
        // console.log(`${valueA } < ${valueB}`);
        return 1;
      }
      if (valueA < valueB) {
        // console.log(`${valueA } > ${valueB}`);
        return -1;
      }
      // values must be equal
      return 0;
    });

    return (
      <>
      {claimants && employers &&
      <Paper elevation={3}>
      <Box sx={{borderRadius: 1, padding: 1, background: '#D5D8DC'}}>
        <Grid container spacing={1}>
          {/* claimant */}
          <Grid item>
            <label htmlFor="claimant" style={{display: 'block'}}>Claimant:</label>
            <select
            id='claimant'
            onChange={(e) => handleChangeSearch(e, 'lastFirst', searchVal, setSearchVal)}
            value={searchVal.lastFirst || ''}
            >
              <option value="">
                {"Select"}
              </option>
              {claimantsSorted?.map((n) => (
                  <option key={n.claimantId} value={`${n.lastFirst}`}>
                    {`${n.lastFirst}`}
                  </option>
              ))}
            </select>

            {/* <TextField 
            type='text' 
            style={{marginRight: 10, padding: 5}}
            onChange={(e) => handleChangeSearch(e, 'claimant')}
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            placeholder={`Claimant`}
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => handleClearSearch('claimant')} 
                sx={{visibility: searchValAdvanced.claimant ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            /> */}

            {/* <input 
            type='text' 
            style={{marginRight: 10, padding: 5}}
            onChange={(e) => handleChangeSearch(e, 'claimant')}
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            /> */}

            {/* {claimants &&
            <Autocomplete
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            onChange={(e, v) => handleChangeSearch(e, 'claimant', v)}
            inputValue={inputVal ? inputVal : ''}
            onInputChange={(event, newInputValue) => {
              setInputVal(newInputValue);
            }}
            id="claimant-autocomplete"
            options={claimants?.sort((a, b) => -b.lastName.localeCompare(a.lastName))}
            getOptionLabel={(option) => option.lastName ? `${option.lastName}, ${option.firstName} DOB ${option.birthDate}` : ''}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Claimant" />}
            />
            } */}
          </Grid>
          {/* employer */}
          <Grid item>
            <label htmlFor="employer" style={{display: 'block'}}>Employer:</label>
            <select
            id='employer'
            onChange={(e) => handleChangeSearch(e, 'employer', searchVal, setSearchVal)}
            value={searchVal.employer || ''}
            >
              <option value="">
                {"Select"}
              </option>
              {employersSorted?.map((n) => (
                  <option key={n.employerId} value={`${n.name}`}>
                    {`${n.name}`}
                  </option>
              ))}
            </select>

            {/* {claimants &&
            <Autocomplete
            value={searchValAdvanced.claimant ? searchValAdvanced.claimant : ''}
            onChange={(e, v) => handleChangeSearch(e, 'claimant', v)}
            inputValue={inputVal ? inputVal : ''}
            onInputChange={(event, newInputValue) => {
              setInputVal(newInputValue);
            }}
            id="claimant-autocomplete"
            options={claimants?.sort((a, b) => -b.lastName.localeCompare(a.lastName))}
            getOptionLabel={(option) => option.lastName ? `${option.lastName}, ${option.firstName} DOB ${option.birthDate}` : ''}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Claimant" />}
            />
            } */}

          </Grid>
          {Object.keys(searchVal).length > 0 &&
          <Grid item sx={{paddingLeft: 1}}>
            <button onClick={() => handleClearEntireSearch(searchVal, setSearchVal)}>Clear Search</button>
          </Grid>
          }
        </Grid>
      </Box>
      </Paper>
      }
      </>
    );
}