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

// import { handleChangeSearch, handleClearSearch, handleClearEntireSearch } from '../7-util/HelperFunctions';

import { SearchContext } from '../contexts/SearchContext';

export default function AttorneySearchBar(props) {

    const { 
            searchVals, setSearchVals, 
            detailsId, setDetailsId
          } = useContext(SearchContext);

    const handleClearSearch = () => {
        setSearchVals({...searchVals, attorney: '', attorneyFirm: '', attorneyType: ''});
        setDetailsId({...detailsId, 'attorney': -1})
    };

    const handleChangeType = (e) => {
        setSearchVals({...searchVals, attorneyType: e.target.value});
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
            onChange={(e) => setSearchVals({...searchVals, attorney: e.target.value})}
            value={searchVals.attorney}
            label="Name"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, attorney: ''})}
                sx={{visibility: searchVals.attorney !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />

          </Grid>

          {/* firm */}
          <Grid item>
            
            <TextField 
            type='text' 
            // style={{marginRight: 10, padding: 5}}
            onChange={(e) => setSearchVals({...searchVals, attorneyFirm: e.target.value})}
            value={searchVals.attorneyFirm}
            label="Firm"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, attorneyFirm: ''})}
                sx={{visibility: searchVals.attorneyFirm !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />

          </Grid>

          {/* type */}
          <Grid item>
            
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
              sx={{minWidth: '10ch'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchVals.attorneyType}
              label="Type"
              onChange={(e) => handleChangeType(e)}
              >
                <MenuItem value=''>{`-----`}</MenuItem>
                <MenuItem value='Defense'>Defense</MenuItem>
                <MenuItem value='Plaintiff'>Plaintiff</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          {((searchVals.attorney.length > 0) || (searchVals.attorneyFirm.length > 0) || (searchVals.attorneyType.length > 0)) &&
          <Grid item sx={{paddingLeft: 1}}>

            <Button sx={{ padding: 1 }} onClick={() => handleClearSearch()} variant="contained">Clear Search</Button>

          </Grid>
          }
        </Grid>
      </Box>
      </Paper>
    );
}