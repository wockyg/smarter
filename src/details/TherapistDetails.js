import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';
import EditToolbarSearchBox from '../details/EditToolbarSearchBox';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetTherapist from '../hooks/useGetTherapist';
import useUpdateTherapist from '../hooks/useUpdateTherapist';


export default function TherapistDetails(props) {

    const {detailsId: selectedTherapistId, currentlyEditing, setCurrentlyEditing, searchBox} = props;

    const { status: statusTRP, data: selectedTherapist, error: errorTRP, isFetching: isFetchingTRP } = useGetTherapist(+selectedTherapistId);

    // const selectedTherapist = rows?.length > 0 && rows?.filter((row) => {return (row.therapistId === selectedTherapistId);})[0];

    const mutationUpdate = useUpdateTherapist();

    return (
    <>
    {selectedTherapist &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        name: selectedTherapist.name ? selectedTherapist.name : '',
        address: selectedTherapist.address ? selectedTherapist.address : '',
        city: selectedTherapist.city ? selectedTherapist.city : '',
        state: selectedTherapist.state ? selectedTherapist.state : '',
        zip: selectedTherapist.zip ? selectedTherapist.zip : '',
        phone: selectedTherapist.phone ? selectedTherapist.phone : '',
        phoneExt: selectedTherapist.phoneExt ? selectedTherapist.phoneExt : '',
        fax: selectedTherapist.fax ? selectedTherapist.fax : '',
        email: selectedTherapist.email ? selectedTherapist.email : '',
        notes: selectedTherapist.notes ? selectedTherapist.notes : '',
    }}
    validationSchema={Yup.object({
        name: Yup.string(),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        phone: Yup.string(),
        phoneExt: Yup.string(),
        fax: Yup.string(),
        email: Yup.string(),
        notes: Yup.string(),
    })}
    onSubmit={(values, actions) => {

        console.log("updating therapist...", values);
        
        const keys = Object.keys(values);

        const changedKeys = keys.filter(index => ((selectedTherapist[index] !== null && values[index] !== selectedTherapist[index]) ||
                                                  (selectedTherapist[index] === null && values[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: values[key] }), {});

        changedValues.therapistId = selectedTherapist.therapistId;

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
        selectedParty='therapist'
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        />
        }
        <Grid container spacing={1.5}>
            <EditableGridItem
            field='name'
            label='Name'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            width='20ch'
            />
            <Box width="100%"/>
            <EditableGridItem
            field='address'
            label='Address'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <EditableGridItem
            field='suite'
            label='Suite'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            width='6ch'
            />
            <EditableGridItem
            field='city'
            label='City'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            width='10ch'
            />
            <EditableGridItem
            field='state'
            label='State'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            width='3ch'
            />
            <EditableGridItem
            field='zip'
            label='Zip'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            width='6ch'
            />
            <Box width="100%"/>
            <EditableGridItem
            field='phone'
            label='Phone'
            type='phone'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <EditableGridItem
            field='phoneExt'
            label='Ext'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <EditableGridItem
            field='contact'
            label='Contact'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <Box width="100%"/>
            <EditableGridItem
            field='fax'
            label='Fax'
            type='phone'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <EditableGridItem
            field='email'
            label='Email'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <Box width="100%"/>
            <EditableGridItem
            field='billingPhone'
            label='Billing Phone'
            type='phone'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <EditableGridItem
            field='billingPhoneExt'
            label='Ext'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <EditableGridItem
            field='billingContact'
            label='Billing Contact'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <Box width="100%"/>
            <EditableGridItem
            field='billingFax'
            label='Billing Fax'
            type='phone'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <EditableGridItem
            field='billingEmail'
            label='Billing Email'
            type='text'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <Box width="100%"/>
        </Grid>
        <hr />
        <Grid container spacing={1.5}>
            <EditableGridItem
            field='notes'
            label='Notes'
            type='textarea'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
            <Box width="100%"/>
            <EditableGridItem
            field='ptProfile'
            label='PT Profile'
            type='textarea'
            formikProps={formikProps}
            currentlyEditing={currentlyEditing}
            selectedRow={selectedTherapist}
            />
        </Grid>
        <hr />
        rates section under construction, coming soon
        
    </Form>
        )}
    </Formik>
    </>
    }
    </>);

}