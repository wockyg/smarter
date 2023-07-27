import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormInput from '../form-components/FormInput';
import FormInputPhone from '../form-components/FormInputPhone';
import FormSelectEmployer from '../form-components/FormSelectEmployer';
import FormSelectState from '../form-components/FormSelectState';
import FormSelectGender from '../form-components/FormSelectGender';
import FormTextarea from '../form-components/FormTextarea';
import * as Yup from 'yup';
import { AddFormContext } from '../contexts/AddFormContext';
import '../forms.css'
import useAddClaimant from '../hooks/useAddClaimant';
import {states} from '../lookup-tables/lookup_UsState'
import useGetEmployersDropdown from '../hooks/useGetEmployersDropdown';

export default function ClaimantAddForm() {

    const mutationAdd = useAddClaimant();

    const { status, data: employers, error, isFetching } = useGetEmployersDropdown();

    const { setAddModalOpen, setModalParty } = useContext(AddFormContext);

    return (
        <div>
            <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                employerId: '',
                gender: '',
                birthDate: '',
                injuryDate: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
                alternatePhone: '',
                email: '',
                email2: '',
                dateAdded: '',
                notes: '',
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required('Req'),
                lastName: Yup.string().required('Req'),
                employerId: Yup.number(),
                gender: Yup.string(),
                birthDate: Yup.string(),
                injuryDate: Yup.string(),
                address: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                zip: Yup.string(),
                phone: Yup.string(),
                alternatePhone: Yup.string(),
                email: Yup.string().email(),
                email2: Yup.string().email(),
                dateAdded: Yup.string(),
                notes: Yup.string(),
            })}
            onSubmit={(values, actions) => {
                mutationAdd.mutate(values);
                console.log("adding claimant...");
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
                                <FormSelectGender
                                    id="gender"
                                    label="Gender*:"
                                    name="gender"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormInput
                                    id="birthDate"
                                    label="DOB:"
                                    name="birthDate"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="injuryDate"
                                    label="DOI:"
                                    name="injuryDate"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item xs={12}>
                                <FormSelectEmployer
                                    id="employerId"
                                    label="Employer:"
                                    name="employerId"
                                    type="text"
                                    employers={employers}
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
                                <FormInputPhone
                                    id="alternatePhone"
                                    label="Alt. Phone:"
                                    name="alternatePhone"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item xs="auto">
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
                                    label="Email 2:"
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