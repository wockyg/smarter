import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';

import useUpdateReferral from '../hooks/useUpdateReferral';
import useGetAdjusters from '../hooks/useGetAdjusters';
import useGetCasemanagers from '../hooks/useGetCasemanagers';
import useGetPhysicians from '../hooks/useGetPhysicians';
import useGetAttorneys from '../hooks/useGetAttorneys';
import useGetTherapists from '../hooks/useGetTherapists';

import AdjusterDetails from '../details/AdjusterDetails';
import CasemanagerDetails from '../details/CasemanagerDetails';
import ClientDetails from '../details/ClientDetails';
import ClaimantDetails from '../details/ClaimantDetails';
import EmployerDetails from '../details/EmployerDetails';
import PhysicianDetails from '../details/PhysicianDetails';
import TherapistDetails from '../details/TherapistDetails';
import AttorneyDetails from '../details/AttorneyDetails';

import { DetailsContext } from '../contexts/DetailsContext';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import "../App.css"

export default function ClaimIdInfo(props) {

    const { selectedClaim } = props;

    const { status: statusAdjusters, data: adjusters, error: errorAdjusters, isFetching: isFetchingAdjusters } = useGetAdjusters();
    const { status: statusCasemanagers, data: casemanagers, error: errorCasemanagers, isFetching: isFetchingCasemanagers } = useGetCasemanagers();
    const { status: statusPhysicians, data: physicians, error: errorPhysicians, isFetching: isFetchingPhysicians } = useGetPhysicians();
    const { status: statusAttorneys, data: attorneys, error: errorAttorneys, isFetching: isFetchingAttorneys } = useGetAttorneys();
    const { status: statusTherapists, data: therapists, error: errorTherapists, isFetching: isFetchingTherapists } = useGetTherapists();

    const mutationUpdate = useUpdateReferral();

    const { currentlyEditingSelectedClaim: currentlyEditing, setCurrentlyEditingSelectedClaim: setCurrentlyEditing } = useContext(DetailsContext);

    const [hoverStyle, setHoverStyle] = useState({});

    const [anchorEl, setAnchorEl] = useState(null);

    const [fieldUpdate, setFieldUpdate] = useState("");

    const [fieldRemove, setFieldRemove] = useState("");

    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        selectedClaim.referralId && setAnchorEl(event.currentTarget?.parentNode);
        // console.log(event.currentTarget.innerHTML);
    };

    const handleClickMenuUpdate = (cm2) => {
        const field = cm2 ? cm2 : anchorEl?.id;
        setFieldUpdate(field);
        console.log(field);
    };

    const handleClickMenuRemove = () => {
        const field = anchorEl?.id;
        setFieldRemove(field);
        console.log(fieldRemove);
    };

    const handleRemoveConfirm = () => {
        const values = {referralId: selectedClaim.referralId, [fieldRemove]: null};
        console.log(values);
        mutationUpdate.mutate(values);
        handleCloseMenu();
    };

    const handleCloseMenu = () => {
        setHoverStyle({[anchorEl.id]: ""});
        setAnchorEl(null);
        setFieldUpdate("");
        setFieldRemove("");
    };

    const handleMouseOver = (t) => {
        hoverStyle[`${t}`] !== 'blink2' &&
            setHoverStyle({[t]: "blink2"});
            // console.log("over", t);
            // console.log(hoverStyle);
    };

    const handleMouseOut = (t) => {
        hoverStyle[`${t}`] !== 'blink1' &&
            setHoverStyle({[t]: ""});
            // console.log("out", t);
            // console.log(hoverStyle);
        
    };

    function ClickableInfo(props){

        const {title, value, claim} = props;

        return(
            <>
            {claim ?
            <div id={`${title}Inside`} className={hoverStyle[`${title}`]} style={{cursor: "pointer"}} onClick={(event) => handleOpenMenu(event)} onMouseEnter={() => handleMouseOver(title)} onMouseLeave={() => handleMouseOut(title)}>
                {`${props.claim.therapist}`}<br />
                {`${props.claim.therapistAddress},${props.claim.therapistSuite ? ` Ste. ${props.claim.therapistSuite},` : ''} ${props.claim.therapistCity}, ${props.claim.therapistState} ${props.claim.therapistZip}`}<br />
                {`P ${props.claim.therapistPhone}${props.claim.therapistPhoneExt ? ` x${props.claim.therapistPhoneExt}` : ''} :: F ${props.claim.therapistFax}`}
            </div>
            :
            <div id={`${title}Inside`} className={hoverStyle[`${title}`]} style={{cursor: "pointer"}} onClick={(event) => handleOpenMenu(event)} onMouseEnter={() => handleMouseOver(title)} onMouseLeave={() => handleMouseOut(title)}>
                {`${value}`}
            </div>
            }
            </>
        );
    }

    function SubmitButton(){
        return <button type="submit">Ok</button>
    }
    function ConfirmRemove(){
        return(
            <>
            <Grid container spacing={1.0}>
                <Grid item>
                    {"Remove?"}
                </Grid>
                <Grid item>
                    <button onClick={handleRemoveConfirm}>{"Yes"}</button>
                </Grid>
            </Grid>
            </>
        );
    }

    return (
        <>
        {selectedClaim &&
        <>
        <Grid container spacing={1.0}>
            <Tooltip title={<AdjusterDetails detailsId={selectedClaim.adjusterId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />} enterDelay={500} leaveDelay={200}>
                <Grid item>
                    <label htmlFor="adjusterId">Adjuster:</label>
                    <div id="adjusterId">{selectedClaim.adjusterId ? <ClickableInfo title="adjusterId" value={`${selectedClaim.adjuster} | ${selectedClaim.adjusterClient}`} /> : <ClickableInfo title="adjusterId" value="----" />}</div>
                </Grid>
            </Tooltip>
            <Box width="100%"/>
            <Tooltip title={<CasemanagerDetails detailsId={selectedClaim.casemanagerId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />} enterDelay={500} leaveDelay={200}>
            <Grid item>
                <label htmlFor="casemanagerId">Case Manager(s):</label>
                <div id="casemanagerId">{selectedClaim.casemanagerId ? <ClickableInfo title="casemanagerId" value={`${selectedClaim.casemanager} | ${selectedClaim.casemanagerClient}`} /> : <ClickableInfo title="casemanagerId" value="----" />}</div>
            </Grid>
            </Tooltip>
            <Box width="100%"/>
            {selectedClaim.casemanager2Id &&
                <Tooltip title={<CasemanagerDetails detailsId={selectedClaim.casemanager2Id} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />} enterDelay={500} leaveDelay={200}>
                <Grid item>
                    <div id="casemanager2Id"><ClickableInfo title="casemanager2Id" value={`${selectedClaim.casemanager2} | ${selectedClaim.casemanager2Client}`} /></div>
                </Grid>
                </Tooltip>
            }
            <Box width="100%"/>
            <Tooltip title={<PhysicianDetails detailsId={selectedClaim.physicianId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />} enterDelay={500} leaveDelay={200}>
            <Grid item>
                <label htmlFor="physicianId">Physician:</label>
                <div id="physicianId">{selectedClaim.physicianId ? <ClickableInfo title="physicianId" value={`${selectedClaim.physicianDisplay}`} /> : <ClickableInfo title="physicianId" value="----" />}</div>
            </Grid>
            </Tooltip>
            <Box width="100%"/>
            {(selectedClaim.plaintiffAttorneyId || selectedClaim.defenseAttorneyId) ?
                <>
                {selectedClaim.plaintiffAttorneyId &&
                <Tooltip title={<AttorneyDetails detailsId={selectedClaim.plaintiffAttorneyId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />} enterDelay={500} leaveDelay={200}>
                <Grid item>
                    <label htmlFor="plaintiffAttorneyId">Attorney(s):</label>
                    <div id="plaintiffAttorneyId"><ClickableInfo title="plaintiffAttorneyId" value={`${selectedClaim.plaintiffAttorney}${selectedClaim.plaintiffAttorneyFirm ? ` | ${selectedClaim.plaintiffAttorneyFirm}` : ''} | Plaintiff`} /></div>
                </Grid> 
                </Tooltip>
                }
                {selectedClaim.defenseAttorneyId && selectedClaim.plaintiffAttorneyId && <Box width="100%"/>}
                {selectedClaim.defenseAttorneyId &&
                <Tooltip title={<AttorneyDetails detailsId={selectedClaim.defenseAttorneyId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />} enterDelay={500} leaveDelay={200}>
                <Grid item>
                    {!selectedClaim.plaintiffAttorneyId && <label htmlFor="defenseAttorneyId">Attorney(s):</label>}
                    <div id="defenseAttorneyId"><ClickableInfo title="defenseAttorneyId" value={`${selectedClaim.defenseAttorney}${selectedClaim.defenseAttorneyFirm ? ` | ${selectedClaim.defenseAttorneyFirm}` : ''} | Defense`} /></div>
                </Grid> 
                </Tooltip>
                }
                        
                </>
                :
                <Grid item>
                    <label htmlFor="plaintiffAttorneyId">Attorney(s):</label>
                    <div id="plaintiffAttorneyId"><ClickableInfo title="plaintiffAttorneyId" value="----" /></div>
                </Grid>
            }
            <Box width="100%"/>
            <Tooltip title={<TherapistDetails detailsId={selectedClaim.therapistId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />} enterDelay={500} leaveDelay={200}>
            <Grid item>
                <label htmlFor="therapistId">Therapist:</label>
                <div id="therapistId">{selectedClaim.therapistId ? 
                <ClickableInfo title="therapistId" claim={selectedClaim} />            
                : 
                <ClickableInfo title="therapistId" value="----" />
                }
                </div>
            </Grid>
            </Tooltip>
        </Grid>
        <Menu
            id="ids-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
        >
            {((fieldUpdate === "") && (fieldRemove === "")) && 
                <div>
                {selectedClaim[anchorEl?.id] > 0 ?
                    <div>
                    <MenuItem onClick={() => handleClickMenuUpdate()}>
                        Update {anchorEl?.id}
                    </MenuItem>
                    <MenuItem onClick={() => handleClickMenuRemove()}>
                        Remove {anchorEl?.id}
                    </MenuItem>
                    {((selectedClaim.casemanager2Id === null) && (anchorEl?.id === "casemanagerId")) &&
                    <MenuItem onClick={() => handleClickMenuUpdate("casemanager2Id")}>
                        Add casemanager2Id
                    </MenuItem>
                    }
                    {((((selectedClaim.plaintiffAttorneyId === null) && (selectedClaim.defenseAttorneyId !== null)) || ((selectedClaim.plaintiffAttorneyId !== null) && (selectedClaim.defenseAttorneyId === null))) && ((anchorEl?.id === "plaintiffAttorneyId") || (anchorEl?.id === "defenseAttorneyId"))) &&
                    <MenuItem 
                    onClick={() => {
                        const att = (anchorEl?.id === "plaintiffAttorneyId") ? "defenseAttorneyId" : "plaintiffAttorneyId";
                        handleClickMenuUpdate(att);
                    }}>
                        Add {anchorEl?.id === "plaintiffAttorneyId" ? "defenseAttorneyId" : "plaintiffAttorneyId"}
                    </MenuItem>
                    }
                    </div>
                    :
                    <div>
                        {anchorEl?.id === "plaintiffAttorneyId" ?
                        <div>
                            <MenuItem onClick={() => handleClickMenuUpdate("plaintiffAttorneyId")}>
                                Add plaintiffAttorneyId
                            </MenuItem>
                            <MenuItem onClick={() => handleClickMenuUpdate("defenseAttorneyId")}>
                                Add defenseAttorneyId
                            </MenuItem>
                        </div>
                        :
                        <MenuItem onClick={() => handleClickMenuUpdate()}>
                            Add {anchorEl?.id}
                        </MenuItem>
                        }
                    </div>
                }
                
                </div>
            }
            

            {((fieldUpdate !== "") || (fieldRemove !== "")) && 
                <MenuItem>
                {fieldUpdate === "adjusterId" &&
                    <>
                    <Formik
                    initialValues={{
                        referralId: selectedClaim.referralId,
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
                                        options={adjusters.sort((a, b) => -b.client.localeCompare(a.client))}
                                        groupBy={(option) => option.client}
                                        getOptionLabel={(option) => `${option.lastFirst}`}
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
                    </>
                }
                {fieldUpdate === "casemanagerId" &&
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
                                        options={casemanagers.sort((a, b) => -b.client.localeCompare(a.client))}
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
                {fieldUpdate === "casemanager2Id" &&
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
                                        options={casemanagers.sort((a, b) => -b.client.localeCompare(a.client))}
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
                {fieldUpdate === "physicianId" &&
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
                                        options={physicians.sort((a, b) => -b.lastFirst.localeCompare(a.lastFirst))}
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
                {fieldUpdate === "plaintiffAttorneyId" &&
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
                                        options={attorneys.sort((a, b) => -b.lastFirst.localeCompare(a.lastFirst))}
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
                {fieldUpdate === "defenseAttorneyId" &&
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
                                        options={attorneys.sort((a, b) => -b.lastFirst.localeCompare(a.lastFirst))}
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
                {fieldUpdate === "therapistId" &&
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
                                        options={therapists.sort((a, b) => -b.name.localeCompare(a.name))}
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
                {fieldRemove !== "" &&
                    <ConfirmRemove />
                }
                </MenuItem>
            }
        </Menu>
        </>
        }
        </>
    );

}