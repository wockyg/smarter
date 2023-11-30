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
import useGetEmployersDropdown from '../hooks/useGetEmployersDropdown';

import { SearchContext } from '../contexts/SearchContext';

export default function QuarterlyReportsSearchBar(props) {

    const { quarterlyReportsVals, setQuarterlyReportsVals } = useContext(SearchContext);

    const { status: statusClients, data: clients, error: errorClients, isFetching: isFetchingClients } = useGetClientsDropdown();
    const { status: statusEmployers, data: employers, error: errorEmployers, isFetching: isFetchingEmployers } = useGetEmployersDropdown();



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
        setQuarterlyReportsVals({quarter: '', year: '', client: null, employer: null});
    };

    const handleChangeYear = (e) => {
      setQuarterlyReportsVals({...quarterlyReportsVals, year: e.target.value});
    };

    const handleChangeQuarter = (e) => {
      setQuarterlyReportsVals({...quarterlyReportsVals, quarter: e.target.value});
    };

    return (
      <>
      {clients && employers &&
      <Paper elevation={3}>
      <Box sx={{borderRadius: 1, padding: 1, background: '#D5D8DC', width: '100%'}}>
        <Grid container spacing={1}>

          {/* quarter */}
          <Grid item>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Quarter</InputLabel>
              <Select
              sx={{minWidth: '10ch'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quarterlyReportsVals.quarter}
              label="Quarter"
              onChange={(e) => handleChangeQuarter(e)}
              >
                <MenuItem value='Q1'>{`Q1`}</MenuItem>
                <MenuItem value='Q2'>{`Q2`}</MenuItem>
                <MenuItem value='Q3'>{`Q3`}</MenuItem>
                <MenuItem value='Q4'>{`Q4`}</MenuItem>
              </Select>
            </FormControl>
            
          </Grid>

          {/* year */}
          <Grid item>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
              sx={{minWidth: '10ch'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={quarterlyReportsVals.year}
              label="Quarter"
              onChange={(e) => handleChangeYear(e)}
              >
                <MenuItem value='2024'>{`2024`}</MenuItem>
                <MenuItem value='2023'>{`2023`}</MenuItem>
                <MenuItem value='2022'>{`2022`}</MenuItem>
                <MenuItem value='2021'>{`2021`}</MenuItem>
                <MenuItem value='2020'>{`2020`}</MenuItem>
                <MenuItem value='2019'>{`2019`}</MenuItem>
              </Select>
            </FormControl>
            
          </Grid>

          {/* client */}
          <Grid item>

            <Autocomplete
            // open={claimantSearchInputVal.length > 0}
            value={quarterlyReportsVals.client}
            onChange={(event, claim) => {
              setQuarterlyReportsVals({...quarterlyReportsVals, client: claim})
            }}
            inputValue={quarterlyReportsVals.clientInput}
            onInputChange={(event, newInputValue) => {
              setQuarterlyReportsVals({...quarterlyReportsVals, clientInput: newInputValue});
            }}
            id="clientSearch-autocomplete"
            options={clientsSorted}
            getOptionLabel={(option) => `${option.client}`}
            sx={{ width: 500, background: '#F8F9F9', padding: 1 }}
            renderInput={(params) => <TextField {...params} size="small" label="Client" />}
            />

          </Grid>

          {/* employer */}
          <Grid item>

            <Autocomplete
            value={quarterlyReportsVals.employer}
            onChange={(event, claim) => {
              setQuarterlyReportsVals({...quarterlyReportsVals, employer: claim});
            }}
            inputValue={quarterlyReportsVals.employerInput}
            onInputChange={(event, newInputValue) => {
              setQuarterlyReportsVals({...quarterlyReportsVals, employerInput: newInputValue});
            }}
            id="employerSearch-autocomplete"
            options={employersSorted}
            getOptionLabel={(option) => `${option.name}`}
            sx={{ width: 500, background: '#F8F9F9', padding: 1 }}
            renderInput={(params) => <TextField {...params} size="small" label="Employer" />}
            />

          </Grid>

          {(quarterlyReportsVals.client || quarterlyReportsVals.employer || (quarterlyReportsVals.year.length > 0) || (quarterlyReportsVals.quarter.length > 0)) &&
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