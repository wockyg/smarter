import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetAdjusters from '../hooks/useGetAdjusters';
import useGetClients from '../hooks/useGetClients';
import useUpdateAdjuster from '../hooks/useUpdateAdjuster';


export default function AdjusterDetails(props) {

    const {detailsId: selectedAdjusterId, currentlyEditing, setCurrentlyEditing} = props;

    const { status: statusRowsADJ, data: rowsADJ, error: errorRowsADJ, isFetching: isFetchingRowsADJ } = useGetAdjusters();

    const selectedAdjuster = rowsADJ?.length > 0 && rowsADJ?.filter((row) => {return (row.adjusterId === selectedAdjusterId);})[0];

    const { status: statusRowsCLI, data: rowsCLI, error: errorRows, isFetching: isFetchingRowsCLI } = useGetClients();

    const clientNames = rowsCLI?.map(n => {
                                    return ({clientId: n.clientId, client: n.client})
                                });

    const mutationUpdate = useUpdateAdjuster();

    return (
    <>
    {selectedAdjuster &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        firstName: selectedAdjuster.firstName ? selectedAdjuster.firstName : '',
        lastName: selectedAdjuster.lastName ? selectedAdjuster.lastName : '',
        clientId: selectedAdjuster.clientId ? selectedAdjuster.clientId : '',
        address: selectedAdjuster.address ? selectedAdjuster.address : '',
        city: selectedAdjuster.city ? selectedAdjuster.city : '',
        state: selectedAdjuster.state ? selectedAdjuster.state : '',
        zip: selectedAdjuster.zip ? selectedAdjuster.zip : '',
        phone: selectedAdjuster.phone ? selectedAdjuster.phone : '',
        fax: selectedAdjuster.fax ? selectedAdjuster.fax : '',
        email: selectedAdjuster.email ? selectedAdjuster.email : '',
        fceRate: selectedAdjuster.fceRate ? selectedAdjuster.fceRate : '',
        ppdRate: selectedAdjuster.ppdRate ? selectedAdjuster.ppdRate : '',
        ppdDiscountRate: selectedAdjuster.ppdDiscountRate ? selectedAdjuster.ppdDiscountRate : '',
        status: selectedAdjuster.status ? selectedAdjuster.status : '',
        ptInstructions: selectedAdjuster.ptInstructions ? selectedAdjuster.ptInstructions : '',
        fceppdInstructions: selectedAdjuster.fceppdInstructions ? selectedAdjuster.fceppdInstructions : '',
        billingInstructions: selectedAdjuster.billingInstructions ? selectedAdjuster.billingInstructions : '',
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

        console.log("updating adjuster...", values);
        
        const keys = Object.keys(values);

        const changedKeys = keys.filter(index => ((selectedAdjuster[index] !== null && values[index] !== selectedAdjuster[index]) ||
                                                  (selectedAdjuster[index] === null && values[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: values[key] }), {});

        changedValues.adjusterId = selectedAdjuster.adjusterId;

        console.log(changedValues);

        mutationUpdate.mutate(changedValues);

        actions.setSubmitting(false);
    }}
    >
        {formikProps => (
    <Form>
        <EditToolbar
        selectedParty='adjuster'
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
                    selectedRow={selectedAdjuster}
                    width='20ch'
                    />
                    <EditableGridItem
                    field='lastName'
                    label='Last Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='clientId'
                    label='Client'
                    type='select'
                    formikProps={formikProps}
                    options={clientNames}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='status'
                    label='Status'
                    type='select'
                    formikProps={formikProps}
                    options={['Active', 'Inactive', '']}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='address'
                    label='Address'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    />
                    <EditableGridItem
                    field='suite'
                    label='Suite'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='city'
                    label='City'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    width='10ch'
                    />
                    <EditableGridItem
                    field='state'
                    label='State'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    width='3ch'
                    />
                    <EditableGridItem
                    field='zip'
                    label='Zip'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    width='6ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phone'
                    label='Phone'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    />
                    <EditableGridItem
                    field='phoneExt'
                    label='Ext'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    width='5ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fax'
                    label='Fax'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email'
                    label='Email'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fceRate'
                    label='FCE Rate'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    width='5ch'
                    />
                    <EditableGridItem
                    field='ppdRate'
                    label='PPD Rate'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    width='5ch'
                    />
                    <EditableGridItem
                    field='ppdDiscountRate'
                    label='PPD D/c Rate'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
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
                    selectedRow={selectedAdjuster}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fceppdInstructions'
                    label='FCE/PPD Instructions'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='billingInstructions'
                    label='Billing Instructions'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedAdjuster}
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