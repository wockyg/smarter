import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';


import { useFormikContext } from 'formik';

export default function EditToolbar(props) {

    const {currentlyEditing, setCurrentlyEditing} = props;

    const { values: formValues, submitForm, resetForm } = useFormikContext();

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
        <Grid container>
            <Grid item xs={6}>
                {/* {`${selectedParty} details`} */}
            </Grid>
            <Grid item xs={6}>
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
    );
}