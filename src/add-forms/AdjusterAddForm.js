import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormInput from '../form-components/FormInput';
import FormInputPhone from '../form-components/FormInputPhone';
import FormSelectClient from '../form-components/FormSelectClient';
import FormSelectState from '../form-components/FormSelectState';
import FormTextarea from '../form-components/FormTextarea';
import * as Yup from 'yup';
import { AddFormContext } from '../contexts/AddFormContext';
import '../forms.css'
import useGetClients from '../hooks/useGetClients';
import useAddAdjuster from '../hooks/useAddAdjuster';
import {states} from '../lookup-tables/lookup_UsState'

export default function AdjusterAddForm() {

    const mutationAdd = useAddAdjuster();

    const { status, data: clients, error, isFetching } = useGetClients();

    const { setAddModalOpen, setModalParty } = useContext(AddFormContext);

    return (
        <div>
            <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                clientId: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                phoneExt: '',
                fax: '',
                email: '',
                fceRate: '',
                ppdRate: '',
                ppdDiscountRate: '',
                ptInstructions: '',
                fceppdInstructions: '',
                billingInstructions: '',
                status: 'Active',
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required('Req'),
                lastName: Yup.string().required('Req'),
                clientId: Yup.number().required('Req'),
                address: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                zip: Yup.string(),
                phone: Yup.string(),
                phoneExt: Yup.string(),
                fax: Yup.string(),
                email: Yup.string().email(),
                fceRate: Yup.number(),
                ppdRate: Yup.number(),
                ppdDiscountRate: Yup.number(),
                ptInstructions: Yup.string(),
                fceppdInstructions: Yup.string(),
                billingInstructions: Yup.string(),
                status: Yup.string(),
            })}
            onSubmit={(values, actions) => {
                mutationAdd.mutate(values);
                console.log("adding adjuster...");                
                // alert(JSON.stringify(values, null, 2));
                // for (const property in values) {
                //   console.log(`${property}: ${values[property]}`);
                // }
                // setAddModalOpen(false);
                // setModalParty('');
                actions.setSubmitting(false);
                // actions.resetForm();
            }}
            >
            {({ values }) => (
                <>
                {mutationAdd.isIdle &&
                    <Form>
                        <Grid container spacing={0.5}>
                            <Grid item>
                                <FormInput
                                    id="firstName"
                                    label="First Name*:"
                                    name="firstName"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="lastName"
                                    label="Last Name*:"
                                    name="lastName"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormSelectClient
                                    id="clientId"
                                    label="Client*:"
                                    name="clientId"
                                    type="text"
                                    clients={clients}
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="address"
                                    label="Address:"
                                    name="address"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="suite"
                                    label="Suite:"
                                    name="suite"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="city"
                                    label="City:"
                                    name="city"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormSelectState
                                    id="state"
                                    label="State:"
                                    name="state"
                                    type="text"
                                    states={states}
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="zip"
                                    label="Zip:"
                                    name="zip"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormInputPhone
                                    id="phone"
                                    label="Phone:"
                                    name="phone"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="phoneExt"
                                    label="Ext:"
                                    name="phoneExt"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormInputPhone
                                    id="fax"
                                    label="Fax:"
                                    name="fax"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <FormInput
                                    id="email"
                                    label="Email:"
                                    name="email"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormInput
                                    id="fceRate"
                                    label="FCE Rate:"
                                    name="fceRate"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <FormInput
                                    id="ppdRate"
                                    label="PPD Rate:"
                                    name="ppdRate"
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <FormInput
                                    id="ppdDiscountRate"
                                    label="PPD Discount Rate:"
                                    name="ppdDiscountRate"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item xs="auto">
                                <FormTextarea
                                    id="ptInstructions"
                                    label="PT Instructions:"
                                    name="ptInstructions"
                                    type="text"
                                    rows="4"
                                    cols="30"
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <FormTextarea
                                    id="fceppdInstructions"
                                    label="FCE/PPD Instructions:"
                                    name="fceppdInstructions"
                                    type="text"
                                    rows="4"
                                    cols="30"
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <FormTextarea
                                    id="billingInstructions"
                                    label="Billing Instructions:"
                                    name="billingInstructions"
                                    type="text"
                                    rows="4"
                                    cols="30"
                                />
                            </Grid>
                            <Grid item xs={12}><button type="submit">Add</button></Grid>
                        </Grid>
                    </Form>
                }
                {mutationAdd.isSuccess &&
                    <>
                    {Object.entries(values).map((row) => <div key={row}>{`${row[0]}: ${row[1]}`}</div>)}
                    <div><button onClick={() => {setAddModalOpen(false); setModalParty('')}}>ok</button></div>
                    </>
                }
                </>
            )}
            </Formik>
        </div>
    )};