import React, { useContext } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormInput from '../form-components/FormInput';
import FormSelectState from '../form-components/FormSelectState';
import FormSelectAssign from '../form-components/FormSelectAssign';
import FormSelectService from '../form-components/FormSelectService';
import FormSelectVisits from '../form-components/FormSelectVisits';
import FormAutoComplete from '../form-components/FormAutocomplete';
import {states} from '../lookup-tables/lookup_UsState';
import { AddFormContext } from '../contexts/AddFormContext';
import useAddReferral from '../hooks/useAddReferral';
import useGetClaimantsDropdown from '../hooks/useGetClaimantsDropdown';
import useGetAdjustersDropdown from '../hooks/useGetAdjustersDropdown';
import useGetAttorneysDropdown from '../hooks/useGetAttorneysDropdown';
import useGetCasemanagersDropdown from '../hooks/useGetCasemanagersDropdown';
import useGetPhysiciansDropdown from '../hooks/useGetPhysiciansDropdown';

import '../forms.css'

export default function ReferralAddForm() {

    const mutationAdd = useAddReferral();

    const { status: statusClaimants, data: claimants, error: errorClaimants, isFetching: isFetchingClaimants } = useGetClaimantsDropdown();
    const { status: statusAdjusters, data: adjusters, error: errorAdjusters, isFetching: isFetchingAdjusters } = useGetAdjustersDropdown();
    const { status: statusAttorneys, data: attorneys, error: errorAttorneys, isFetching: isFetchingAttorneys } = useGetAttorneysDropdown();
    const { status: statusCasemanagers, data: casemanagers, error: errorCasemanagers, isFetching: isFetchingCasemanagers } = useGetCasemanagersDropdown();
    const { status: statusPhysicians, data: physicians, error: errorPhysicians, isFetching: isFetchingPhysicians } = useGetPhysiciansDropdown();

    const { setAddModalOpen, setModalParty } = useContext(AddFormContext);

    return (
        <>
        {claimants && adjusters && attorneys && casemanagers && physicians &&
        <div>
            <Formik
            initialValues={{
                claimantId: '',
                therapistId: '',
                adjusterId: '',
                casemanagerId: '',
                casemanager2Id: '',
                physicianId: '',
                plaintiffAttorneyId: '',
                defenseAttorneyId: '',
                referralStatus: 'Open',
                assign: '',
                spanishSpeaking: [],
                translationNeeded: [],
                transportNeeded: [],
                postOp: [],
                service: '',
                jurisdiction: '',
                bodyPart: '',
                icd10: '',
                approvedVisits: '',
                odg: '',
                evalAndTreat: [],
                claimNumber: '',
                fuDrDate: '',
                claimantInfoFromAdjuster: [],
                rxFromAdjuster: [],
                demosFromAdjuster: [],
                ovnFromAdjuster: [],
                ptNotesFromAdjuster: [],
                jdFromAdjuster: [],
                mriFromAdjuster: [],
                postOpFromAdjuster: [],
                betaTest: [],
            }}
            validationSchema={Yup.object({
                claimantId: Yup.number().required('Req'),
                therapistId: Yup.number(),
                adjusterId: Yup.number(),
                casemanagerId: Yup.number(),
                casemanager2Id: Yup.number(),
                physicianId: Yup.number(),
                plaintiffAttorneyId: Yup.number(),
                defenseAttorneyId: Yup.number(),
                referralStatus: Yup.string(),
                assign: Yup.string().required('Req'),
                spanishSpeaking: Yup.array(),
                translationNeeded: Yup.array(),
                transportNeeded: Yup.array(),
                postOp: Yup.array(),
                service: Yup.string().required('Req'),
                jurisdiction: Yup.string(),
                bodyPart: Yup.string(),
                icd10: Yup.string(),
                approvedVisits: Yup.number(),
                odg: Yup.number(),
                evalAndTreat: Yup.array(),
                claimNumber: Yup.string(),
                fuDrDate: Yup.string(),
                claimantInfoFromAdjuster: Yup.array(),
                rxFromAdjuster: Yup.array(),
                demosFromAdjuster: Yup.array(),
                ovnFromAdjuster: Yup.array(),
                ptNotesFromAdjuster: Yup.array(),
                jdFromAdjuster: Yup.array(),
                mriFromAdjuster: Yup.array(),
                postOpFromAdjuster: Yup.array(),
                betaTest: Yup.array(),
            })}
            onSubmit={(values, actions) => {
                let newValues = {...values};
                if (values.service.includes("FCE") || values.service.includes("PPD")) {
                    newValues = {...newValues, approvedVisits: 1 };
                }
                mutationAdd.mutate(newValues);
                console.log("adding referral...");
                console.log(newValues);
                // console.log(claimants);
                // alert(JSON.stringify(values, null, 2));
                // actions.resetForm();
                actions.setSubmitting(false);
                // setAddModalOpen(false);
                // setModalParty('');
            }}
            >
            {({ values, handleChange, setFieldValue }) => (
                <>
                {claimants && adjusters && attorneys && casemanagers && physicians && mutationAdd.isIdle &&
                    <Form>
                        <Grid container spacing={0.5}>
                            <Grid item>
                                <FormInput
                                    id="transportNeeded"
                                    label="Transportation:"
                                    name="transportNeeded"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="spanishSpeaking"
                                    label="Spanish:"
                                    name="spanishSpeaking"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="translationNeeded"
                                    label="Translation:"
                                    name="translationNeeded"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="postOp"
                                    label="Post-Op:"
                                    name="postOp"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="rxFromAdjuster"
                                    label="Rx:"
                                    name="rxFromAdjuster"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="demosFromAdjuster"
                                    label="Demos:"
                                    name="demosFromAdjuster"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                             <Grid item>
                                <FormInput
                                    id="ovnFromAdjuster"
                                    label="OVN:"
                                    name="ovnFromAdjuster"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                             <Grid item>
                                <FormInput
                                    id="ptNotesFromAdjuster"
                                    label="PT Notes:"
                                    name="ptNotesFromAdjuster"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="jdFromAdjuster"
                                    label="JD:"
                                    name="jdFromAdjuster"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="mriFromAdjuster"
                                    label="MRI:"
                                    name="mriFromAdjuster"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="postOpFromAdjuster"
                                    label="Post-Op Report:"
                                    name="postOpFromAdjuster"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="betaTest"
                                    label="Add to Tracked Files:"
                                    name="betaTest"
                                    type="checkbox"
                                    value="Yes"
                                /> 
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <FormSelectAssign
                                    id="assign"
                                    label="Assign*:"
                                    name="assign"
                                    type="text"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="bodyPart"
                                    label="Body Part:"
                                    name="bodyPart"
                                    type="text"
                                    className="bodyPart"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="icd10"
                                    label="ICD10:"
                                    name="icd10"
                                    type="text"
                                    className="icd10"
                                />
                            </Grid>
                            <Grid item>
                                <FormInput
                                    id="odg"
                                    label="ODG:"
                                    name="odg"
                                    type="text"
                                    className="odg"
                                />
                            </Grid>
                            <Grid item>
                                <FormSelectState
                                    id="jurisdiction"
                                    label="Jurisdiction:"
                                    name="jurisdiction"
                                    type="text"
                                    states={states}
                                />
                            </Grid>
                            <Grid item>
                                <FormSelectService
                                    id="service"
                                    label="Service*:"
                                    name="service"
                                    type="text"
                                />
                            </Grid>
                            {values.service.includes("DPT") &&
                                <Grid item>
                                    <FormSelectVisits
                                        id="approvedVisits"
                                        label="Visits:"
                                        name="approvedVisits"
                                        type="text"
                                    />
                                </Grid>
                            }
                            <Box width="100%"/>
                            <Grid item>
                                <FormInput
                                    id="claimNumber"
                                    label="Claim #*:"
                                    name="claimNumber"
                                    type="text"
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <Autocomplete
                                id="claimantId"
                                name="claimantId"
                                options={claimants}
                                // groupBy={(option) => option.state}
                                getOptionLabel={(option) => `${option.lastName}, ${option.firstName} DOB ${option.birthDate}`}
                                style={{ width: 300 }}
                                onChange={(event, value) => {
                                    setFieldValue("claimantId", value?.claimantId);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    onChange={handleChange}
                                    margin="normal"
                                    label="Claimant"
                                    fullWidth
                                    value={values?.claimantId}
                                    />
                                )}
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <Autocomplete
                                id="adjusterId"
                                name="adjusterId"
                                options={adjusters.sort((a, b) => -b.client?.localeCompare(a.client))}
                                groupBy={(option) => option.client}
                                getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
                                style={{ width: 300 }}
                                onChange={(event, value) => {
                                    setFieldValue("adjusterId", value?.adjusterId);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    onChange={handleChange}
                                    margin="normal"
                                    label="Adjuster"
                                    fullWidth
                                    value={values?.adjusterId}
                                    />
                                )}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                id="casemanagerId"
                                name="casemanagerId"
                                options={casemanagers.sort((a, b) => -b.client?.localeCompare(a.client))}
                                groupBy={(option) => option.client}
                                getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
                                style={{ width: 300 }}
                                onChange={(event, value) => {
                                    setFieldValue("casemanagerId", value?.casemanagerId);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    onChange={handleChange}
                                    margin="normal"
                                    label="Case Manager"
                                    fullWidth
                                    value={values?.casemanagerId}
                                    />
                                )}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                id="casemanager2Id"
                                name="casemanager2Id"
                                options={casemanagers.sort((a, b) => -b.client?.localeCompare(a.client))}
                                groupBy={(option) => option.client}
                                getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
                                style={{ width: 300 }}
                                onChange={(event, value) => {
                                    setFieldValue("casemanager2Id", value?.casemanager2Id);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    onChange={handleChange}
                                    margin="normal"
                                    label="Case Manager 2"
                                    fullWidth
                                    value={values?.casemanager2Id}
                                    />
                                )}
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <Autocomplete
                                id="physicianId"
                                name="physicianId"
                                options={physicians.sort((a, b) => -b.lastName?.localeCompare(a.lastName))}
                                // groupBy={(option) => option.state}
                                getOptionLabel={(option) => `${option.lastName}, ${option.firstName} | ${option.physicianId}`}
                                style={{ width: 500 }}
                                onChange={(event, value) => {
                                    setFieldValue("physicianId", value?.physicianId);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    onChange={handleChange}
                                    margin="normal"
                                    label="Physician"
                                    fullWidth
                                    value={values?.physicianId}
                                    />
                                )}
                                />
                            </Grid>
                            <Box width="100%"/>
                            <Grid item>
                                <Autocomplete
                                id="defenseAttorneyId"
                                name="defenseAttorneyId"
                                options={attorneys.sort((a, b) => -b.lastName?.localeCompare(a.lastName))}
                                // groupBy={(option) => option.state}
                                getOptionLabel={(option) => `${option.lastName}, ${option.firstName} | ${option.attorneyId}`}
                                style={{ width: 500 }}
                                onChange={(event, value) => {
                                    setFieldValue("defenseAttorneyId", value?.defenseAttorneyId);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    onChange={handleChange}
                                    margin="normal"
                                    label="Defense Attorney"
                                    fullWidth
                                    value={values?.defenseAttorneyId}
                                    />
                                )}
                                />
                            </Grid>
                            <Grid item>
                                <Autocomplete
                                id="plaintiffAttorneyId"
                                name="plaintiffAttorneyId"
                                options={attorneys.sort((a, b) => -b.lastName?.localeCompare(a.lastName))}
                                // groupBy={(option) => option.state}
                                getOptionLabel={(option) => `${option.lastName}, ${option.firstName} | ${option.attorneyId}`}
                                style={{ width: 500 }}
                                onChange={(event, value) => {
                                    setFieldValue("plaintiffAttorneyId", value?.plaintiffAttorneyId);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                    {...params}
                                    onChange={handleChange}
                                    margin="normal"
                                    label="Plaintiff Attorney"
                                    fullWidth
                                    value={values?.plaintiffAttorneyId}
                                    />
                                )}
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
        }
        </>
    )};