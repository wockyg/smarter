import { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Paper from '@mui/material/Paper';

// import { handleChangeSearch, handleClearSearch, handleClearEntireSearch } from '../7-util/HelperFunctions';

import { SearchContext } from '../contexts/SearchContext';

export default function PhysicianSearchBar(props) {

    const { 
            searchVals, setSearchVals, 
            detailsId, setDetailsId
          } = useContext(SearchContext);

    const handleClearSearch = () => {
        setSearchVals({...searchVals, physician: '', physicianFacility: '', physicianNPI: ''});
        setDetailsId({...detailsId, 'physician': -1})
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
            onChange={(e) => setSearchVals({...searchVals, physician: e.target.value})}
            value={searchVals.physician}
            label="Name"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, physician: ''})}
                sx={{visibility: searchVals.physician !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />

          </Grid>

          {/* facility */}
          <Grid item>
            
            <TextField 
            type='text' 
            // style={{marginRight: 10, padding: 5}}
            onChange={(e) => setSearchVals({...searchVals, physicianFacility: e.target.value})}
            value={searchVals.physicianFacility}
            label="Facility"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, physicianFacility: ''})}
                sx={{visibility: searchVals.physicianFacility !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />

          </Grid>

          {/* NPI */}
          <Grid item>
            
            <TextField 
            type='text' 
            // style={{marginRight: 10, padding: 5}}
            onChange={(e) => setSearchVals({...searchVals, physicianNPI: e.target.value})}
            value={searchVals.physicianNPI}
            label="NPI"
            InputProps={{
                endAdornment: (
                <IconButton 
                onClick={() => setSearchVals({...searchVals, physicianNPI: ''})}
                sx={{visibility: searchVals.physicianNPI !== '' ? 'visible' : 'hidden'}}
                >
                    <HighlightOffIcon />
                </IconButton>
                )
            }}
            />

          </Grid>

          {((searchVals.physician.length > 0) || (searchVals.physicianFacility.length > 0) || (searchVals.physicianNPI.length > 0)) &&
          <Grid item sx={{paddingLeft: 1}}>

            <Button sx={{ padding: 1 }} onClick={() => handleClearSearch()} variant="contained">Clear Search</Button>

          </Grid>
          }
        </Grid>
      </Box>
      </Paper>
    );
}