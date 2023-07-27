import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import EditToolbar from '../details/EditToolbar';
import EditToolbarSearchBox from '../details/EditToolbarSearchBox';

import EditableGridItem from '../form-components/EditableGridItem';

import useGetClient from '../hooks/useGetClient';
import useUpdateClient from '../hooks/useUpdateClient';


export default function ClientDetails(props) {

    const {detailsId: selectedClientId, currentlyEditing, setCurrentlyEditing, searchBox} = props;

    const { status: statusCLI, data: selectedClient, error: errorCLI, isFetching: isFetchingCLI } = useGetClient(+selectedClientId);

    // const selectedClient = rows?.length > 0 && rows?.filter((row) => {return (row.clientId === selectedClientId);})[0];

    const mutationUpdate = useUpdateClient();

    return (
    <>
    {selectedClient &&
    <>
    <Formik
    enableReinitialize
    initialValues={{
        client: selectedClient.client ? selectedClient.client : '',
        billReview: selectedClient.billReview ? selectedClient.billReview : '',
        phone: selectedClient.phone ? selectedClient.phone : '',
        fax: selectedClient.fax ? selectedClient.fax : '',
        email: selectedClient.email ? selectedClient.email : '',
        billingProtocol: selectedClient.billingProtocol ? selectedClient.billingProtocol : '',
        notes: selectedClient.notes ? selectedClient.notes : '',
        mailingAddress: selectedClient.mailingAddress ? selectedClient.mailingAddress : '',        
    }}
    validationSchema={Yup.object({
        client: Yup.string(),
        billReview: Yup.string(),
        phone: Yup.string(),
        fax: Yup.string(),
        email: Yup.string(),
        billingProtocol: Yup.string(),
        notes: Yup.string(),
        mailingAddress: Yup.string(),
    })}
    onSubmit={(values, actions) => {

        console.log("updating client...", values);
        
        const keys = Object.keys(values);

        const changedKeys = keys.filter(index => ((selectedClient[index] !== null && values[index] !== selectedClient[index]) ||
                                                  (selectedClient[index] === null && values[index] !== '')));
                                                  
        const changedValues = changedKeys.reduce((obj, key, index) => ({ ...obj, [key]: values[key] }), {});

        changedValues.clientId = selectedClient.clientId;

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
        selectedParty='client'
        currentlyEditing={currentlyEditing}
        setCurrentlyEditing={setCurrentlyEditing}
        />
        }
        <Grid container spacing={0.5}>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='client'
                    label='Name'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClient}
                    width='20ch'
                    />
                    <EditableGridItem
                    field='billReview'
                    label='Bill Review'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClient}
                    width='20ch'
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='phone'
                    label='Phone'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClient}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='fax'
                    label='Fax'
                    type='phone'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClient}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='email'
                    label='Email'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClient}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='billingProtocol'
                    label='Billing Protocol'
                    type='text'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClient}
                    />
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container spacing={0.5}>
                    <EditableGridItem
                    field='mailingAddress'
                    label='Mailing Address'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClient}
                    />
                    <Box width="100%"/>
                    <EditableGridItem
                    field='notes'
                    label='Notes'
                    type='textarea'
                    formikProps={formikProps}
                    currentlyEditing={currentlyEditing}
                    selectedRow={selectedClient}
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