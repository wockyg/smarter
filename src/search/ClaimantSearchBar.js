import { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';
import { services } from '../lookup-tables/lookup_service';
// import { handleChangeSearch, handleClearSearch, handleClearEntireSearch } from '../7-util/HelperFunctions';

import Paper from '@mui/material/Paper';

import useGetEmployersDropdown from '../hooks/useGetEmployersDropdown';

import { SearchContext } from '../contexts/SearchContext';

export default function ClaimantSearchBar(props) {

    const { status: statusEmployers, data: employers, error: errorEmployers, isFetching: isFetchingEmployers } = useGetEmployersDropdown();

    const { 
            searchVals, setSearchVals, 
            searchInputVals, setSearchInputVals,
            detailsId, setDetailsId
          } = useContext(SearchContext);

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

    const handleClearSearch = () => {
        setSearchInputVals({...searchInputVals, claimantEmployer: ''});
        setSearchVals({...searchVals, claimant: '', claimantEmployer: null});
        setDetailsId({...detailsId, 'claimant': -1})
    };

    return (
      <>
      {employers &&
      <Paper elevation={3}>
      <Box sx={{borderRadius: 1, padding: 1, background: '#D5D8DC', width: '100%'}}>
        <Grid container spacing={1}>

          {/* name */}
          <Grid item>

            <TextField 
            type='text' 
            // style={{marginRight: 10, padding: 5}}
            onChange={(e) => setSearchVals({...searchVals, claimant: e.target.value})}
            value={searchVals.claimant}
            label="Name"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, claimant: ''})}
                sx={{visibility: searchVals.claimant !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />

          </Grid>

          {/* employer */}
          <Grid item>

            <Autocomplete
            value={searchVals.claimantEmployer}
            onChange={(event, claim) => {
              setSearchVals({...searchVals, claimantEmployer: claim});
            }}
            inputValue={searchInputVals.claimantEmployer}
            onInputChange={(event, newInputValue) => {
              setSearchInputVals({...searchInputVals, claimantEmployer: newInputValue});
            }}
            id="employerSearch-autocomplete"
            options={employersSorted}
            getOptionLabel={(option) => `${option.name} | ${option.employerId}`}
            sx={{ width: 500, background: '#F8F9F9', padding: 1 }}
            renderInput={(params) => <TextField {...params} size="small" label="Employer" />}
            />

          </Grid>

          {(searchVals.claimantEmployer || (searchVals.claimant.length > 0)) &&
          <Grid item sx={{paddingLeft: 1}}>

            <Button sx={{ padding: 1 }} onClick={() => handleClearSearch()} variant="contained">Clear Search</Button>

          </Grid>
          }
        </Grid>
      </Box>
      </Paper>
      }
      </>
    );
}