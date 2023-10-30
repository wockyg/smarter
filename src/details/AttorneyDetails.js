import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';
import EditToolbarSearchBox from '../details/EditToolbarSearchBox';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetAttorney from '../hooks/useGetAttorney';
import useUpdateAttorney from '../hooks/useUpdateAttorney';


export default function AttorneyDetails(props) {

    const {detailsId: selectedAttorneyId, currentlyEditing, setCurrentlyEditing, searchBox, type} = props;

    const { status: statusATT, data: selectedAttorney, error: errorATT, isFetching: isFetchingATT } = useGetAttorney(+selectedAttorneyId);

    // const selectedAttorney = rows?.length > 0 && rows?.filter((row) => {return (row.attorneyId === selectedAttorneyId);})[0];

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
        {searchBox ?
        <EditToolbarSearchBox
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        />
        :
        <EditToolbar
        selectedParty='attorney'
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        attorneyType={type}
        />
        }
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
                    selectedParty='attorney'
                    width='20ch'
                    />
                    <EditableGridItem
                    field='lastName'
                    label='Last Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    selectedParty='attorney'
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
                    selectedParty='attorney'
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
                    selectedParty='attorney'
                    />
                    <EditableGridItem
                    field='suite'
                    label='Suite'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    selectedParty='attorney'
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
                    selectedParty='attorney'
                    width='10ch'
                    />
                    <EditableGridItem
                    field='state'
                    label='State'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    selectedParty='attorney'
                    width='3ch'
                    />
                    <EditableGridItem
                    field='zip'
                    label='Zip'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    selectedParty='attorney'
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
                    selectedParty='attorney'
                    />
                    <EditableGridItem
                    field='phoneExt'
                    label='Ext'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    selectedParty='attorney'
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
                    selectedParty='attorney'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email'
                    label='Email'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    selectedParty='attorney'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email2'
                    label='Email2'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAttorney}
                    selectedParty='attorney'
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
                    selectedParty='attorney'
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