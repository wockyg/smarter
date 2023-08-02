import { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ClearIcon from '@mui/icons-material/Clear';
import LoopIcon from '@mui/icons-material/Loop';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useGetReferral from '../hooks/useGetReferral';
import useUpdateReferral from '../hooks/useUpdateReferral';
import useGetAdjustersDropdown from '../hooks/useGetAdjustersDropdown';
import useGetCasemanagersDropdown from '../hooks/useGetCasemanagersDropdown';
import useGetPhysiciansDropdown from '../hooks/useGetPhysiciansDropdown';
import useGetAttorneysDropdown from '../hooks/useGetAttorneysDropdown';
import useGetTherapistsDropdown from '../hooks/useGetTherapistsDropdown';

import { useFormikContext } from 'formik';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

export default function EditToolbarSolo(props) {

    let { id: referralId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+referralId);

    const { status: statusAdjusters, data: adjusters, error: errorAdjusters, isFetching: isFetchingAdjusters } = useGetAdjustersDropdown();
    const { status: statusCasemanagers, data: casemanagers, error: errorCasemanagers, isFetching: isFetchingCasemanagers } = useGetCasemanagersDropdown();
    const { status: statusPhysicians, data: physicians, error: errorPhysicians, isFetching: isFetchingPhysicians } = useGetPhysiciansDropdown();
    const { status: statusAttorneys, data: attorneys, error: errorAttorneys, isFetching: isFetchingAttorneys } = useGetAttorneysDropdown();
    const { status: statusTherapists, data: therapists, error: errorTherapists, isFetching: isFetchingTherapists } = useGetTherapistsDropdown();

    const {selectedParty} = props;

    const mutationUpdate = useUpdateReferral();

    const [fieldAdd, setFieldAdd] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickMenuAdd = (attType) => {
        attType 
        ? 
        setFieldAdd(attType) 
        : 
        setFieldAdd(`${selectedParty}Id`);
    };

    const handleAddConfirm = () => {
        const values = {referralId: referralId, [fieldAdd]: null};
        console.log(values);
        mutationUpdate.mutate(values);
        handleCloseMenu();
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setFieldAdd("");
    };

    function SubmitButton(){
        return <button type="submit">Ok</button>
    }

    return(
        <>
        <Grid container>
            <Grid item xs={6}>
                {/* {`${selectedParty} details`} */}
            </Grid>
            <Grid item xs={6}>
                <Box width="100%" sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <MoreVertIcon onClick={(e) => handleOpenMenu(e)} />
                </Box>
            </Grid>
        </Grid>
        <Menu
            id="ids-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
        >
            {fieldAdd === '' ?
            <div>
            {selectedParty === 'attorney' ?
            <div>
            <MenuItem  onClick={() => handleClickMenuAdd('plaintiffAttorneyId')}>
                Add Plaintiff Attorney
            </MenuItem>
            <MenuItem  onClick={() => handleClickMenuAdd('defenseAttorneyId')}>
                Add Defense Attorney
            </MenuItem>
            </div>
            :
            <MenuItem  onClick={() => handleClickMenuAdd()}>
                Add
            </MenuItem>
            }
            </div>
            :
            <MenuItem>

            {fieldAdd === 'adjusterId' &&
                <Formik
                initialValues={{
                    referralId: referralId,
                    adjusterId: "",
                }}
                validationSchema={Yup.object({
                    adjusterId: Yup.number().required(),
                })}
                onSubmit={(values, actions) => {
                    mutationUpdate.mutate(values);
                    console.log("updating referral...", values);
                    // alert(JSON.stringify(values, null, 2));
                    // actions.resetForm();
                    actions.setSubmitting(false);
                    // setAddModalOpen(false);
                    // setModalParty('');
                    handleCloseMenu();
                }}
                >
                    {props => (
                        <Form>
                            <Grid container spacing={1.0}>
                                <Grid item>
                                    <Autocomplete
                                    id="adjusterIdInput"
                                    name="adjusterId"
                                    options={adjusters.sort((a, b) => -b.client?.localeCompare(a.client))}
                                    groupBy={(option) => option.client}
                                    getOptionLabel={(option) => `${option.lastName}, ${option.firstName}`}
                                    style={{ width: 300 }}
                                    onChange={(event, value) => {
                                        props.setFieldValue("adjusterId", value?.adjusterId);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        onChange={props.handleChange}
                                        margin="normal"
                                        label="Adjuster"
                                        fullWidth
                                        value={props.values?.adjusterId}
                                        />
                                    )}
                                    />
                                    {props.errors.adjusterId && <div id="feedback">{props.errors.adjusterId}</div>}
                                </Grid>
                                <Grid item>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            }
            {fieldAdd === "casemanagerId" &&
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    casemanagerId: "",
                }}
                validationSchema={Yup.object({
                    casemanagerId: Yup.number().required(),
                })}
                onSubmit={(values, actions) => {
                    mutationUpdate.mutate(values);
                    console.log("updating referral...", values);
                    // alert(JSON.stringify(values, null, 2));
                    // actions.resetForm();
                    actions.setSubmitting(false);
                    // setAddModalOpen(false);
                    // setModalParty('');
                    handleCloseMenu();
                }}
                >
                    {props => (
                        <Form>
                            <Grid container spacing={1.0}>
                                <Grid item>
                                    <Autocomplete
                                    id="casemanagerIdInput"
                                    name="casemanagerId"
                                    options={casemanagers.sort((a, b) => -b.client?.localeCompare(a.client))}
                                    groupBy={(option) => option.client}
                                    getOptionLabel={(option) => `${option.lastFirst}`}
                                    style={{ width: 300 }}
                                    onChange={(event, value) => {
                                        props.setFieldValue("casemanagerId", value?.casemanagerId);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        onChange={props.handleChange}
                                        margin="normal"
                                        label="Case Manager"
                                        fullWidth
                                        value={props.values?.casemanagerId}
                                        />
                                    )}
                                    />
                                    {props.errors.casemanagerId && <div id="feedback">{props.errors.casemanagerId}</div>}
                                </Grid>
                                <Grid item>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                </>
            }
            {fieldAdd === "casemanager2Id" &&
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    casemanager2Id: "",
                }}
                validationSchema={Yup.object({
                    casemanager2Id: Yup.number().required(),
                })}
                onSubmit={(values, actions) => {
                    mutationUpdate.mutate(values);
                    console.log("updating referral...", values);
                    // alert(JSON.stringify(values, null, 2));
                    // actions.resetForm();
                    actions.setSubmitting(false);
                    // setAddModalOpen(false);
                    // setModalParty('');
                    handleCloseMenu();
                }}
                >
                    {props => (
                        <Form>
                            <Grid container spacing={1.0}>
                                <Grid item>
                                    <Autocomplete
                                    id="casemanager2IdInput"
                                    name="casemanager2Id"
                                    options={casemanagers.sort((a, b) => -b.client?.localeCompare(a.client))}
                                    groupBy={(option) => option.client}
                                    getOptionLabel={(option) => `${option.lastFirst}`}
                                    style={{ width: 300 }}
                                    onChange={(event, value) => {
                                        props.setFieldValue("casemanager2Id", value?.casemanagerId);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        onChange={props.handleChange}
                                        margin="normal"
                                        label="Case Manager 2"
                                        fullWidth
                                        value={props?.values?.casemanager2Id}
                                        />
                                    )}
                                    />
                                    {props.errors.casemanager2Id && <div id="feedback">{props.errors.casemanager2Id}</div>}
                                </Grid>
                                <Grid item>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                </>
            }
            {fieldAdd === "physicianId" &&
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    physicianId: "",
                }}
                validationSchema={Yup.object({
                    physicianId: Yup.number().required(),
                })}
                onSubmit={(values, actions) => {
                    mutationUpdate.mutate(values);
                    console.log("updating referral...", values);
                    // alert(JSON.stringify(values, null, 2));
                    // actions.resetForm();
                    actions.setSubmitting(false);
                    // setAddModalOpen(false);
                    // setModalParty('');
                    handleCloseMenu();
                }}
                >
                    {props => (
                        <Form>
                            <Grid container spacing={1.0}>
                                <Grid item>
                                    <Autocomplete
                                    id="physicianIdInput"
                                    name="physicianId"
                                    options={physicians.sort((a, b) => -b.lastFirst?.localeCompare(a.lastFirst))}
                                    // groupBy={(option) => option.client}
                                    getOptionLabel={(option) => `${option.lastFirst} | ${option.physicianId}`}
                                    style={{ width: 300 }}
                                    onChange={(event, value) => {
                                        props.setFieldValue("physicianId", value?.physicianId);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        onChange={props.handleChange}
                                        margin="normal"
                                        label="Physician"
                                        fullWidth
                                        value={props?.values?.physicianId}
                                        />
                                    )}
                                    />
                                    {props.errors.physicianId && <div id="feedback">{props.errors.physicianId}</div>}
                                </Grid>
                                <Grid item>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                </>
            }
            {fieldAdd === "plaintiffAttorneyId" &&
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    plaintiffAttorneyId: "",
                }}
                validationSchema={Yup.object({
                    plaintiffAttorneyId: Yup.number().required(),
                })}
                onSubmit={(values, actions) => {
                    mutationUpdate.mutate(values);
                    console.log("updating referral...", values);
                    // alert(JSON.stringify(values, null, 2));
                    // actions.resetForm();
                    actions.setSubmitting(false);
                    // setAddModalOpen(false);
                    // setModalParty('');
                    handleCloseMenu();
                }}
                >
                    {props => (
                        <Form>
                            <Grid container spacing={1.0}>
                                <Grid item>
                                    <Autocomplete
                                    id="plaintiffAttorneyIdInput"
                                    name="plaintiffAttorneyId"
                                    options={attorneys.sort((a, b) => -b.lastFirst?.localeCompare(a.lastFirst))}
                                    // groupBy={(option) => option.client}
                                    getOptionLabel={(option) => `${option.lastFirst} | ${option.attorneyId}`}
                                    style={{ width: 300 }}
                                    onChange={(event, value) => {
                                        props.setFieldValue("plaintiffAttorneyId", value?.attorneyId);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        onChange={props.handleChange}
                                        margin="normal"
                                        label="Plaintiff Attorney"
                                        fullWidth
                                        value={props?.values?.plaintiffAttorneyId}
                                        />
                                    )}
                                    />
                                    {props.errors.plaintiffAttorneyId && <div id="feedback">{props.errors.plaintiffAttorneyId}</div>}
                                </Grid>
                                <Grid item>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                </>
            }
            {fieldAdd === "defenseAttorneyId" &&
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    defenseAttorneyId: "",
                }}
                validationSchema={Yup.object({
                    defenseAttorneyId: Yup.number().required(),
                })}
                onSubmit={(values, actions) => {
                    mutationUpdate.mutate(values);
                    console.log("updating referral...", values);
                    // alert(JSON.stringify(values, null, 2));
                    // actions.resetForm();
                    actions.setSubmitting(false);
                    // setAddModalOpen(false);
                    // setModalParty('');
                    handleCloseMenu();
                }}
                >
                    {props => (
                        <Form>
                            <Grid container spacing={1.0}>
                                <Grid item>
                                    <Autocomplete
                                    id="defenseAttorneyIdInput"
                                    name="defenseAttorneyId"
                                    options={attorneys.sort((a, b) => -b.lastFirst?.localeCompare(a.lastFirst))}
                                    // groupBy={(option) => option.client}
                                    getOptionLabel={(option) => `${option.lastFirst} | ${option.attorneyId}`}
                                    style={{ width: 300 }}
                                    onChange={(event, value) => {
                                        props.setFieldValue("defenseAttorneyId", value?.attorneyId);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        onChange={props.handleChange}
                                        margin="normal"
                                        label="Defense Attorney"
                                        fullWidth
                                        value={props?.values?.defenseAttorneyId}
                                        />
                                    )}
                                    />
                                    {props.errors.defenseAttorneyId && <div id="feedback">{props.errors.defenseAttorneyId}</div>}
                                </Grid>
                                <Grid item>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                </>
            }
            {fieldAdd === "therapistId" &&
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    therapistId: "",
                }}
                validationSchema={Yup.object({
                    therapistId: Yup.number().required(),
                })}
                onSubmit={(values, actions) => {
                    mutationUpdate.mutate(values);
                    console.log("updating referral...", values);
                    // alert(JSON.stringify(values, null, 2));
                    // actions.resetForm();
                    actions.setSubmitting(false);
                    // setAddModalOpen(false);
                    // setModalParty('');
                    handleCloseMenu();
                }}
                >
                    {props => (
                        <Form>
                            <Grid container spacing={1.0}>
                                <Grid item>
                                    <Autocomplete
                                    id="therapistIdInput"
                                    name="therapistId"
                                    options={therapists.sort((a, b) => -b.name?.localeCompare(a.name))}
                                    // groupBy={(option) => option.client}
                                    getOptionLabel={(option) => `${option.name} | ${option.address}, ${option.city}, ${option.state} ${option.zip} (${option.therapistId})`}
                                    style={{ width: 600 }}
                                    onChange={(event, value) => {
                                        props.setFieldValue("therapistId", value?.therapistId);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                        {...params}
                                        onChange={props.handleChange}
                                        margin="normal"
                                        label="Therapist"
                                        fullWidth
                                        value={props?.values?.therapistId}
                                        />
                                    )}
                                    />
                                    {props.errors.therapistId && <div id="feedback">{props.errors.therapistId}</div>}
                                </Grid>
                                <Grid item>
                                    <SubmitButton />
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                </>
            }

            </MenuItem>
            }
        </Menu>
        </>
    );
}