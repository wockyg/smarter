import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import WarningIcon from '@mui/icons-material/Warning';


import { useFormikContext } from 'formik';

export default function EditToolbar(props) {

    const {currentlyEditing, setCurrentlyEditing, selectedTherapist} = props;

    const { values: formValues, submitForm, resetForm, handleChange, handleBlur } = useFormikContext();

    const startEditing = () => {
        console.log("start editing");
        setCurrentlyEditing(true);
    }

    const cancelEditing = () => {
        console.log("cancel editing");
        resetForm();
        setCurrentlyEditing(false);
    }

    const stopEditing = () => {
        console.log("done editing");
        submitForm();
        setCurrentlyEditing(false);
    }

    return(
        <div style={{background: (selectedTherapist?.doNotUseDPT || selectedTherapist?.doNotUseFCE || selectedTherapist?.doNotUsePPD) ? '#E62254' : '#2572CD', borderRadius: 2}}>
            <Grid container sx={{paddingTop: 2, paddingRight: 2, paddingBottom: 2}}>
                <Grid item xs={1}>
                    {(selectedTherapist?.doNotUseDPT || selectedTherapist?.doNotUseFCE || selectedTherapist?.doNotUsePPD) &&
                    <WarningIcon />
                    }
                </Grid>
                <Grid item xs={9}>
                    {selectedTherapist && 
                    <>
                    {currentlyEditing ?
                    <input 
                    type='text' 
                    name='name'
                    value={formValues.name ? formValues.name : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{width: '35ch'}}
                    />
                    :
                    selectedTherapist.name
                    }
                    </>
                    }
                </Grid>
                <Grid item xs={2}>
                    <Box width="100%" sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        {currentlyEditing ?
                        <>
                        <SaveIcon onClick={() => stopEditing()} />
                        <ClearIcon onClick={() => cancelEditing()} />
                        </>
                        :
                        <EditIcon onClick={() => startEditing()} />
                        }
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
}