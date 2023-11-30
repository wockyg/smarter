import { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { states } from '../lookup-tables/lookup_UsState';

// import { handleChangeSearch, handleClearSearch, handleClearEntireSearch } from '../7-util/HelperFunctions';

import { SearchContext } from '../contexts/SearchContext';

export default function EmployerSearchBar(props) {

    const { 
            searchVals, setSearchVals, 
            detailsId, setDetailsId
          } = useContext(SearchContext);

    const handleClearSearch = () => {
        setSearchVals({...searchVals, employer: '', employerState: ''});
        setDetailsId({...detailsId, 'employer': -1})
    };

    const handleChangeState = (e) => {
      setSearchVals({...searchVals, employerState: e.target.value});
    };

    return (
      <Paper elevation={3}>
      <Box sx={{borderRadius: 1, padding: 1, background: '#D5D8DC', width: '100%'}}>
        <Grid container spacing={1}>

          {/* name */}
          <Grid item>

            <TextField 
            type='text' 
            // style={{marginRight: 10, padding: 5}}
            onChange={(e) => setSearchVals({...searchVals, employer: e.target.value})}
            value={searchVals.employer}
            label="Name"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, employer: ''})}
                sx={{visibility: searchVals.employer !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />

          </Grid>

          {/* state */}
          <Grid item>
            
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
              sx={{minWidth: '10ch'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchVals.employerState}
              label="State"
              onChange={(e) => handleChangeState(e)}
              >
                <MenuItem value=''>{`--`}</MenuItem>
                {states.map((s, i) => (
                  <MenuItem key={i} value={s.abbrev}>{s.abbrev}</MenuItem>
                ))}
                
              </Select>
            </FormControl>

          </Grid>

          {((searchVals.employer.length > 0) || (searchVals.employerState.length > 0)) &&
          <Grid item sx={{paddingLeft: 1}}>

            <Button sx={{ padding: 1 }} onClick={() => handleClearSearch()} variant="contained">Clear Search</Button>

          </Grid>
          }
        </Grid>
      </Box>
      </Paper>
    );
}