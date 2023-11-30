import { useContext } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {careCoordinators} from '../lookup-tables/lookup_careCoordinators';
import { services } from '../lookup-tables/lookup_service';
// import { handleChangeSearch, handleClearSearch, handleClearEntireSearch } from '../7-util/HelperFunctions';

import useGetClientsDropdown from '../hooks/useGetClientsDropdown';

import { SearchContext } from '../contexts/SearchContext';

export default function AdjusterSearchBar(props) {

    const { status: statusClients, data: clients, error: errorClients, isFetching: isFetchingClients } = useGetClientsDropdown();

    const { 
            searchVals, setSearchVals, 
            searchInputVals, setSearchInputVals,
            detailsId, setDetailsId
          } = useContext(SearchContext);

    const clientsSorted = clients && clients?.sort((a, b) => {
      const valueA = a.client === null ? '' : (typeof a.client === "string" ? a.client.toUpperCase() : a.client);
      const valueB = b.client === null ? '' : (typeof b.client === "string" ? b.client.toUpperCase() : b.client);
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
        setSearchInputVals({...searchInputVals, adjusterClient: ''})
        setSearchVals({...searchVals, adjuster: '', adjusterStatus: '', adjusterClient: null});
        setDetailsId({...detailsId, 'adjuster': -1})
    };

    const handleChangeStatus = (e) => {
      setSearchVals({...searchVals, adjusterStatus: e.target.value});
    };

    return (
      <>
      {clients &&
      <Paper elevation={3}>
      <Box sx={{borderRadius: 1, padding: 1, background: '#D5D8DC', width: '100%'}}>
        <Grid container spacing={1}>

          {/* name */}
          <Grid item>

            <TextField 
            type='text' 
            // style={{marginRight: 10, padding: 5}}
            onChange={(e) => setSearchVals({...searchVals, adjuster: e.target.value})}
            value={searchVals.adjuster}
            label="Name"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, adjuster: ''})}
                sx={{visibility: searchVals.adjuster !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />
            
          </Grid>

          {/* client */}
          <Grid item>

            <Autocomplete
            // open={claimantSearchInputVal.length > 0}
            value={searchVals.adjusterClient}
            onChange={(event, claim) => {
              setSearchVals({...searchVals, adjusterClient: claim})
            }}
            inputValue={searchInputVals.adjusterClient}
            onInputChange={(event, newInputValue) => {
              setSearchInputVals({...searchInputVals, adjusterClient: newInputValue});
            }}
            id="clientSearch-autocomplete"
            options={clientsSorted}
            getOptionLabel={(option) => `${option.client} | ${option.clientId}`}
            sx={{ width: 500, background: '#F8F9F9', padding: 1 }}
            renderInput={(params) => <TextField {...params} size="small" label="Client" />}
            />

          </Grid>

          {/* status */}
          <Grid item>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
              sx={{minWidth: '10ch'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchVals.adjusterStatus}
              label="Status"
              onChange={(e) => handleChangeStatus(e)}
              >
                <MenuItem value=''>{`-----`}</MenuItem>
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          {(searchVals.adjusterClient || (searchVals.adjuster.length > 0) || (searchVals.adjusterStatus.length > 0)) &&
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