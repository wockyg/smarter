import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormInput from '../form-components/FormInput';
import FormInputPhone from '../form-components/FormInputPhone';
import FormSelectBillingProtocol from '../form-components/FormSelectBillingProtocol';
import FormTextarea from '../form-components/FormTextarea';
import * as Yup from 'yup';
import { AddFormContext } from '../contexts/AddFormContext';
import '../forms.css'
import useAddClient from '../hooks/useAddClient';

export default function ClientAddForm() {

    const mutationAdd = useAddClient();

    const { setAddModalOpen, setModalParty } = useContext(AddFormContext);

    return (
        <div>
            <Formik
            initialValues={{
                client: '',
                billReview: '',
                phone: '',
                fax: '',
                email: '',
                billingProtocol: '',
                notes: '',
                mailingAddress: '',
            }}
            validationSchema={Yup.object({
                client: Yup.string().required('Req'),
                billReview: Yup.string(),
                phone: Yup.string(),
                fax: Yup.string(),
                email: Yup.string().email(),
                billingProtocol: Yup.string(),
                notes: Yup.string(),
                mailingAddress: Yup.string(),
            })}
            onSubmit={(values, actions) => {
                mutationAdd.mutate(values);
                console.log("adding client...");
                // alert(JSON.stringify(values, null, 2));
                // actions.resetForm();
                actions.setSubmitting(false);
                // setAddModalOpen(false);
                // setModalParty('');
            }}
            >
            {({ values }) => (
                <>
                {mutationAdd.isIdle &&
                    <Form>
                        <Grid container spacing={0.5}>
                            <Grid item>
                                <FormInput
                                    id="client"
                                    label="Name*:"
                                    name="client"
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
                            <Box width="100%"/>
                            <Grid item xs="auto">
                                <FormInputPhone
                                    id="fax"
                                    label="Fax:"
                                    name="fax"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
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
                                    id="billReview"
                                    label="Bill Review:"
                                    name="billReview"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormSelectBillingProtocol
                                    id="billingProtocol"
                                    label="Billing Protocol:"
                                    name="billingProtocol"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item xs="auto">
                                <FormTextarea
                                    id="notes"
                                    label="Notes:"
                                    name="notes"
                                    type="text"
                                    rows="4"
                                    cols="30"
                                />
                            </Grid>
                            <Grid item xs="auto">
                                <FormTextarea
                                    id="mailingAddress"
                                    label="Mailing Address:"
                                    name="mailingAddress"
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