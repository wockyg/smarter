import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';
import EditToolbarSearchBox from '../details/EditToolbarSearchBox';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetPhysician from '../hooks/useGetPhysician';
import useUpdatePhysician from '../hooks/useUpdatePhysician';


export default function PhysicianDetails(props) {

    const {detailsId: selectedPhysicianId, currentlyEditing, setCurrentlyEditing, searchBox} = props;

    const { status: statusPSC, data: selectedPhysician, error: errorPSC, isFetching: isFetchingPSC } = useGetPhysician(+selectedPhysicianId);

    // const selectedPhysician = rowsCMT?.length > 0 && rowsCMT?.filter((row) => {return (row.physicianId === selectedPhysicianId);})[0];

    const mutationUpdate = useUpdatePhysician();

    return (
    <>
    {selectedPhysician &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        firstName: selectedPhysician.firstName ? selectedPhysician.firstName : '',
        lastName: selectedPhysician.lastName ? selectedPhysician.lastName : '',
        titles: selectedPhysician.titles ? selectedPhysician.titles : '',
        facility: selectedPhysician.facility ? selectedPhysician.facility : '',
        address: selectedPhysician.address ? selectedPhysician.address : '',
        city: selectedPhysician.city ? selectedPhysician.city : '',
        state: selectedPhysician.state ? selectedPhysician.state : '',
        zip: selectedPhysician.zip ? selectedPhysician.zip : '',
        phone: selectedPhysician.phone ? selectedPhysician.phone : '',
        phoneExt: selectedPhysician.phoneExt ? selectedPhysician.phoneExt : '',
        fax: selectedPhysician.fax ? selectedPhysician.fax : '',
        email: selectedPhysician.email ? selectedPhysician.email : '',
        email2: selectedPhysician.email2 ? selectedPhysician.email2 : '',
        notes: selectedPhysician.notes ? selectedPhysician.notes : '',
        npi: selectedPhysician.npi ? selectedPhysician.npi : '',
    }}
    validationSchema={Yup.object({
        firstName: Yup.string(),
        lastName: Yup.string(),
        titles: Yup.string(),
        facility: Yup.string(),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        phone: Yup.string(),
        phoneExt: Yup.string(),
        email: Yup.string(),
        email2: Yup.string(),
        notes: Yup.string(),
        npi: Yup.number(),
    })}
    onSubmit={(values, actions) => {

        console.log("updating physician...", values);
        
        const keys = Object.keys(values);

        const changedKeys = keys.filter(index => ((selectedPhysician[index] !== null && values[index] !== selectedPhysician[index]) ||
                                                  (selectedPhysician[index] === null && values[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: values[key] }), {});

        changedValues.physicianId = selectedPhysician.physicianId;

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
        selectedParty='physician'
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
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
                    selectedRow={selectedPhysician}
                    width='20ch'
                    />
                    <EditableGridItem
                    field='lastName'
                    label='Last Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='titles'
                    label='Titles'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    width='10ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='facility'
                    label='Facility'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='address'
                    label='Address'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    />
                    <EditableGridItem
                    field='suite'
                    label='Suite'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='city'
                    label='City'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    width='10ch'
                    />
                    <EditableGridItem
                    field='state'
                    label='State'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    width='3ch'
                    />
                    <EditableGridItem
                    field='zip'
                    label='Zip'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phone'
                    label='Phone'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phoneExt'
                    label='Ext'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fax'
                    label='Fax'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    />
                    <EditableGridItem
                    field='email'
                    label='Email'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email2'
                    label='Email2'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    />
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='npi'
                    label='NPI'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='notes'
                    label='Notes'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedPhysician}
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