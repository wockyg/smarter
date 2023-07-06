import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormInput from '../form-components/FormInput';
import FormInputPhone from '../form-components/FormInputPhone';
import FormSelectState from '../form-components/FormSelectState';
import FormTextarea from '../form-components/FormTextarea';
import * as Yup from 'yup';
import { AddFormContext } from '../contexts/AddFormContext';
import '../forms.css'
import useAddPhysician from '../hooks/useAddPhysician';
import {states} from '../lookup-tables/lookup_UsState'

export default function PhysicianAddForm() {

    const mutationAdd = useAddPhysician();

    const { setAddModalOpen, setModalParty } = useContext(AddFormContext);

    return (
        <div>
            <Formik
            initialValues={{
                lastName: '',
                firstName: '',
                titles: '',
                facility: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                phoneExt: '',
                fax: '',
                email: '',
                email2: '',
                notes: '',
                npi: '',
            }}
            validationSchema={Yup.object({
                lastName: Yup.string().required('Req'),
                firstName: Yup.string().required('Req'),
                titles: Yup.string().required('Req'),
                facility: Yup.string().required('Req'),
                address: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                zip: Yup.string(),
                phone: Yup.string(),
                phoneExt: Yup.string(),
                fax: Yup.string(),
                email: Yup.string().email(),
                email2: Yup.string().email(),
                notes: Yup.string(),
                npi: Yup.number(),
            })}
            onSubmit={(values, actions) => {
                mutationAdd.mutate(values);
                console.log("adding physician...");
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
                            <Grid item>
                                <FormInput
                                    id="titles"
                                    label="Titles:"
                                    name="titles"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormInput
                                    id="npi"
                                    label="NPI:"
                                    name="npi"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormInput
                                    id="facility"
                                    label="Facility:"
                                    name="facility"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
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
                                    label="Ext.:"
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
                            <Grid item>
                                <FormInput
                                    id="email"
                                    label="Email:"
                                    name="email"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="email2"
                                    label="Email2:"
                                    name="email2"
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