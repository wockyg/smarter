import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';
import EditToolbarSearchBox from '../details/EditToolbarSearchBox';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetCasemanager from '../hooks/useGetCasemanager';
import useGetClientsDropdown from '../hooks/useGetClientsDropdown';
import useUpdateCasemanager from '../hooks/useUpdateCasemanager';


export default function CasemanagerDetails(props) {

    const {detailsId: selectedCasemanagerId, currentlyEditing, setCurrentlyEditing, searchBox, cm2} = props;

    const { status: statusNCM, data: selectedCasemanager, error: errorNCM, isFetching: isFetchingNCM } = useGetCasemanager(+selectedCasemanagerId);

    // const selectedCasemanager = rowsNCM?.length > 0 && rowsNCM?.filter((row) => {return (row.casemanagerId === selectedCasemanagerId);})[0];

    const { status: statusRowsCLI, data: clients, error: errorRows, isFetching: isFetchingRowsCLI } = useGetClientsDropdown();

    const mutationUpdate = useUpdateCasemanager();

    return (
    <>
    {selectedCasemanager &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        firstName: selectedCasemanager.firstName ? selectedCasemanager.firstName : '',
        lastName: selectedCasemanager.lastName ? selectedCasemanager.lastName : '',
        clientId: selectedCasemanager.clientId ? selectedCasemanager.clientId : '',
        address: selectedCasemanager.address ? selectedCasemanager.address : '',
        city: selectedCasemanager.city ? selectedCasemanager.city : '',
        state: selectedCasemanager.state ? selectedCasemanager.state : '',
        zip: selectedCasemanager.zip ? selectedCasemanager.zip : '',
        phone: selectedCasemanager.phone ? selectedCasemanager.phone : '',
        fax: selectedCasemanager.fax ? selectedCasemanager.fax : '',
        email: selectedCasemanager.email ? selectedCasemanager.email : '',
        fceRate: selectedCasemanager.fceRate ? selectedCasemanager.fceRate : '',
        ppdRate: selectedCasemanager.ppdRate ? selectedCasemanager.ppdRate : '',
        ppdDiscountRate: selectedCasemanager.ppdDiscountRate ? selectedCasemanager.ppdDiscountRate : '',
        status: selectedCasemanager.status ? selectedCasemanager.status : '',
        ptInstructions: selectedCasemanager.ptInstructions ? selectedCasemanager.ptInstructions : '',
        fceppdInstructions: selectedCasemanager.fceppdInstructions ? selectedCasemanager.fceppdInstructions : '',
        billingInstructions: selectedCasemanager.billingInstructions ? selectedCasemanager.billingInstructions : '',
    }}
    validationSchema={Yup.object({
        firstName: Yup.string(),
        lastName: Yup.string(),
        clientId: Yup.number(),
        address: Yup.string(),
        city: Yup.string(),
        state: Yup.string(),
        zip: Yup.string(),
        phone: Yup.string(),
        fax: Yup.string(),
        email: Yup.string(),
        fceRate: Yup.string(),
        ppdRate: Yup.string(),
        ppdDiscountRate: Yup.string(),
        status: Yup.string(),
        ptInstructions: Yup.string(),
        fceppdInstructions: Yup.string(),
        billingInstructions: Yup.string(),
    })}
    onSubmit={(values, actions) => {

        console.log("updating casemanager...", values);
        
        const keys = Object.keys(values);

        const changedKeys = keys.filter(index => ((selectedCasemanager[index] !== null && values[index] !== selectedCasemanager[index]) ||
                                                  (selectedCasemanager[index] === null && values[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: values[key] }), {});

        changedValues.casemanagerId = selectedCasemanager.casemanagerId;

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
        selectedParty={cm2 ? 'casemanager2' : 'casemanager'}
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
                    selectedRow={selectedCasemanager}
                    width='20ch'
                    />
                    <EditableGridItem
                    field='lastName'
                    label='Last Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='clientId'
                    label='Client'
                    type='select'
                    formikProps={formikProps}
                    options={clients}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='status'
                    label='Status'
                    type='select'
                    formikProps={formikProps}
                    options={['Active', 'Inactive', '']}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='address'
                    label='Address'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    />
                    <EditableGridItem
                    field='suite'
                    label='Suite'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='city'
                    label='City'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='10ch'
                    />
                    <EditableGridItem
                    field='state'
                    label='State'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='3ch'
                    />
                    <EditableGridItem
                    field='zip'
                    label='Zip'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phone'
                    label='Phone'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    />
                    <EditableGridItem
                    field='phoneExt'
                    label='Ext'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='5ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fax'
                    label='Fax'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email'
                    label='Email'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fceRate'
                    label='FCE Rate'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='5ch'
                    />
                    <EditableGridItem
                    field='ppdRate'
                    label='PPD Rate'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='5ch'
                    />
                    <EditableGridItem
                    field='ppdDiscountRate'
                    label='PPD D/c Rate'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    width='5ch'
                    />
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='ptInstructions'
                    label='PT Instructions'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fceppdInstructions'
                    label='FCE/PPD Instructions'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='billingInstructions'
                    label='Billing Instructions'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedCasemanager}
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