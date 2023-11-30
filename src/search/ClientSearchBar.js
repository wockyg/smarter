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

export default function ClientSearchBar(props) {

    const { 
            searchVals, setSearchVals, 
            detailsId, setDetailsId
          } = useContext(SearchContext);

    const handleClearSearch = () => {
        setSearchVals({...searchVals, client: '', clientBillingProtocol: '', clientDiscount: ''});
        setDetailsId({...detailsId, 'client': -1})
    };

    const handleChangeProtocol = (e) => {
        setSearchVals({...searchVals, clientBillingProtocol: e.target.value});
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
            onChange={(e) => setSearchVals({...searchVals, client: e.target.value})}
            value={searchVals.client}
            label="Name"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, client: ''})}
                sx={{visibility: searchVals.client !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />

          </Grid>

          {/* billingProtocol */}
          <Grid item>
            
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Protocol</InputLabel>
              <Select
              sx={{minWidth: '15ch'}}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={searchVals.clientBillingProtocol}
              label="Protocol"
              onChange={(e) => handleChangeProtocol(e)}
              >
                <MenuItem value=''>{`-----`}</MenuItem>
                <MenuItem value='Electronic'>Electronic</MenuItem>
                <MenuItem value='Email'>Email</MenuItem>
                <MenuItem value='Fax'>Fax</MenuItem>
                <MenuItem value='Mail'>Mail</MenuItem>
              </Select>
            </FormControl>

          </Grid>

          {((searchVals.client.length > 0) || (searchVals.clientBillingProtocol.length > 0) || (searchVals.clientDiscount.length > 0)) &&
          <Grid item sx={{paddingLeft: 1}}>

            <Button sx={{ padding: 1 }} onClick={() => handleClearSearch()} variant="contained">Clear Search</Button>

          </Grid>
          }
        </Grid>
      </Box>
      </Paper>
    );
}