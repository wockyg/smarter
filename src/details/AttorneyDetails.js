import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetAttorneys from '../hooks/useGetAttorneys';
import useUpdateAttorney from '../hooks/useUpdateAttorney';


export default function AttorneyDetails(props) {

    const {detailsId: selectedAttorneyId, currentlyEditing, setCurrentlyEditing} = props;

    const { status: statusRows, data: rows, error: errorRows, isFetching: isFetchingRows } = useGetAttorneys();

    const selectedAttorney = rows?.length > 0 && rows?.filter((row) => {return (row.attorneyId === selectedAttorneyId);})[0];

    const mutationUpdate = useUpdateAttorney();

    return (
    <>
    {selectedAttorney &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        firstName: selectedAttorney.firstName ? selectedAttorney.firstName : '',
        lastName: selectedAttorney.lastName ? selectedAttorney.lastName : '',
        firm: selectedAttorney.firm ? selectedAttorney.firm : '',
        address: selectedAttorney.address ? selectedAttorney.address : '',
        city: selectedAttorney.city ? selectedAttorney.city : '',
        state: selectedAttorney.state ? selectedAttorney.state : '',
        zip: selectedAttorney.zip ? selectedAttorney.zip : '',
        phone: selectedAttorney.phone ? selectedAttorney.phone : '',
        fax: selectedAttorney.fax ? selectedAttorney.fax : '',
        email: selectedAttorney.email ? selectedAttorney.email : '',
        email2: selectedAttorney.email2 ? selectedAttorney.email2 : '',
        type: selectedAttorney.type ? selectedAttorney.type : '',        
    }}
    validationSchema={Yup.object({
        firstName: Yup.string(),
        lastName: Yup.string(),
        firm: Yup.string(),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        phone: Yup.string(),
        fax: Yup.string(),
        email: Yup.string(),
        email2: Yup.string(),
        type: Yup.string(),
    })}
    onSubmit={(values, actions) => {

        console.log("updating attorney...", values);
        
        const keys = Object.keys(values);

        const changedKeys = keys.filter(index => ((selectedAttorney[index] !== null && values[index] !== selectedAttorney[index]) ||
                                                  (selectedAttorney[index] === null && values[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: values[key] }), {});

        changedValues.attorneyId = selectedAttorney.attorneyId;

        console.log(changedValues);

        mutationUpdate.mutate(changedValues);

        actions.setSubmitting(false);
    }}
    >
        {formikProps => (
    <Form>
        <EditToolbar
        selectedParty='attorney'
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        />
        <Grid container spacing={0.5}>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='firstName'
                    label='First Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    width='20ch'
                    />
                    <EditableGridItem
                    field='lastName'
                    label='Last Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='firm'
                    label='Firm'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='address'
                    label='Address'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    />
                    <EditableGridItem
                    field='suite'
                    label='Suite'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='city'
                    label='City'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    width='10ch'
                    />
                    <EditableGridItem
                    field='state'
                    label='State'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    width='3ch'
                    />
                    <EditableGridItem
                    field='zip'
                    label='Zip'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phone'
                    label='Phone'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    />
                    <EditableGridItem
                    field='phoneExt'
                    label='Ext'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    width='5ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fax'
                    label='Fax'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email'
                    label='Email'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email2'
                    label='Email2'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    />
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <Box width="100%"/>
                    <EditableGridItem
                    field='type'
                    label='Type'
                    type='select'
                    formikProps={formikProps}
                    options={['Defense', 'Plaintiff', '']}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    />
                </Grid>
            </Grid>
        </Grid>
    </Form>
        )}
    </Formik>
    </>
    }
    </>);

}