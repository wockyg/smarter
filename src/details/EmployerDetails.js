import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';
import EditToolbarSearchBox from '../details/EditToolbarSearchBox';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetEmployer from '../hooks/useGetEmployer';
import useUpdateEmployer from '../hooks/useUpdateEmployer';


export default function EmployerDetails(props) {

    const {detailsId: selectedEmployerId, currentlyEditing, setCurrentlyEditing, searchBox} = props;

    const { status: statusEMP, data: selectedEmployer, error: errorEMP, isFetching: isFetchingEMP } = useGetEmployer(+selectedEmployerId);

    // const selectedEmployer = rows?.length > 0 && rows?.filter((row) => {return (row.employerId === selectedEmployerId);})[0];

    const mutationUpdate = useUpdateEmployer();

    return (
    <>
    {selectedEmployer &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        name: selectedEmployer.name ? selectedEmployer.name : '',
        address: selectedEmployer.address ? selectedEmployer.address : '',
        city: selectedEmployer.city ? selectedEmployer.city : '',
        state: selectedEmployer.state ? selectedEmployer.state : '',
        zip: selectedEmployer.zip ? selectedEmployer.zip : '',
        phone: selectedEmployer.phone ? selectedEmployer.phone : '',
        phoneExt: selectedEmployer.phoneExt ? selectedEmployer.phoneExt : '',
        phone2: selectedEmployer.phone2 ? selectedEmployer.phone2 : '',
        phone2Ext: selectedEmployer.phone2Ext ? selectedEmployer.phone2Ext : '',
        fax: selectedEmployer.fax ? selectedEmployer.fax : '',
        email: selectedEmployer.email ? selectedEmployer.email : '',
        notes: selectedEmployer.notes ? selectedEmployer.notes : '',
    }}
    validationSchema={Yup.object({
        name: Yup.string(),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        phone: Yup.string(),
        phoneExt: Yup.string(),
        phone2: Yup.string(),
        phone2Ext: Yup.string(),
        fax: Yup.string(),
        email: Yup.string(),
        notes: Yup.string(),
    })}
    onSubmit={(values, actions) => {

        console.log("updating employer...", values);
        
        const keys = Object.keys(values);

        const changedKeys = keys.filter(index => ((selectedEmployer[index] !== null && values[index] !== selectedEmployer[index]) ||
                                                  (selectedEmployer[index] === null && values[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: values[key] }), {});

        changedValues.employerId = selectedEmployer.employerId;

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
        selectedParty='employer'
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        />
        }
        <Grid container spacing={0.5}>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='name'
                    label='Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='address'
                    label='Address'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    />
                    <EditableGridItem
                    field='suite'
                    label='Suite'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='city'
                    label='City'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    width='10ch'
                    />
                    <EditableGridItem
                    field='state'
                    label='State'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    width='3ch'
                    />
                    <EditableGridItem
                    field='zip'
                    label='Zip'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phone'
                    label='Phone'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    />
                    <EditableGridItem
                    field='phoneExt'
                    label='Ext'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phone2'
                    label='Phone2'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    />
                    <EditableGridItem
                    field='phone2Ext'
                    label='Ext'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fax'
                    label='Fax'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email'
                    label='Email'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
                    />
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='notes'
                    label='Notes'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedEmployer}
                    selectedParty='employer'
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