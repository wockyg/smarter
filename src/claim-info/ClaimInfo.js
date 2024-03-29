import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import useUpdateReferral from '../hooks/useUpdateReferral';

import {careCoordinators} from '../lookup-tables/lookup_careCoordinators'
import {services} from '../lookup-tables/lookup_service'
import {visitNumbers} from '../lookup-tables/lookup_visitNumbers'
import { states } from '../lookup-tables/lookup_UsState';
import { times } from '../lookup-tables/lookup_times';
import { reasons } from '../lookup-tables/lookup_fuHoldReasons';

import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import "../App.css"

export default function ClaimInfo(props) {

    const {selectedClaim} = props;

    const mutationUpdate = useUpdateReferral();

    const [hoverStyle, setHoverStyle] = useState({});

    const [anchorEl, setAnchorEl] = useState(null);

    const [fieldUpdate, setFieldUpdate] = useState("");

    const open = Boolean(anchorEl);

    const handleOpenMenu = (event) => {
        selectedClaim.referralId && setAnchorEl(event.currentTarget?.parentNode);
        // console.log(event.currentTarget.innerHTML);
    };

    const handleClickMenuUpdate = () => {
        const field = anchorEl?.id;
        if (field !== 'confirmedPayor') {
            setFieldUpdate(field);
        }
        else {
            const vals = {
                referralId: selectedClaim.referralId,
                confirmedPayor: true
            }
            mutationUpdate.mutate(vals);
            handleCloseMenu();
        }
    };

    const handleCloseMenu = () => {
        setHoverStyle({[anchorEl.id]: ""});
        setAnchorEl(null);
        setFieldUpdate("");
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

        const {title, value} = props;

        return(
            <>
            <div id={`${title}Inside`} className={hoverStyle[`${title}`]} style={{cursor: "pointer"}} onClick={(event) => handleOpenMenu(event)} onMouseEnter={() => handleMouseOver(title)} onMouseLeave={() => handleMouseOut(title)}>
                {`${value}`}
                {/* {title === "ptStatus" && value === "Follow-Up" &&
                <div style={{fontSize: '10px'}}>{selectedClaim?.fuHoldNotes}</div>
                } */}
            </div>
            </>
        );
    }

    function SubmitButton(){
        return <button type="submit">Ok</button>
    }

    return (
        <>
        <Grid container spacing={2.0}>
            <Grid item>
                <label htmlFor="assign" style={{display: 'block'}}>Assign:</label>
                <div id="assign">{selectedClaim.assign ? <ClickableInfo title="assign" value={selectedClaim.assign} /> : "??"}</div>
            </Grid>
            <Grid item>
                <label htmlFor="referralStatus" style={{display: 'block'}}>Ref Status:</label>
                <div id="referralStatus">{selectedClaim.referralStatus ? (selectedClaim.referralStatus !== "Complete" ? <ClickableInfo title="referralStatus" value={selectedClaim.referralStatus} /> : selectedClaim.referralStatus) : "???"}</div>
            </Grid>
            <Grid item>
                <label htmlFor="ptStatus" style={{display: 'block'}}>PT Status:</label>
                <div id="ptStatus">{selectedClaim.ptStatus ? <ClickableInfo title="ptStatus" value={selectedClaim.ptStatus} /> : "----"}</div>
            </Grid>
            <Grid item>
                <label htmlFor="billingStatus" style={{display: 'block'}}>Billing Status:</label>
                <div id="billingStatus">{selectedClaim.billingStatus ? selectedClaim.billingStatus : "----"}</div>
            </Grid>
            <Box width="100%"/>
            <Grid item>
                <label htmlFor="service" style={{display: 'block'}}>Service:</label>
                <div id="service">{selectedClaim.service ? <ClickableInfo title="service" value={selectedClaim.service} /> : "???"}</div>
            </Grid>
            {selectedClaim?.serviceGeneral === "DPT" &&
            <><Grid item>
                <label htmlFor="approvedVisits" style={{display: 'block'}}>Visits:</label>
                <div id="approvedVisits">{selectedClaim.approvedVisits ? <ClickableInfo title="approvedVisits" value={selectedClaim.approvedVisits} /> : <ClickableInfo title="approvedVisits" value="---" />}</div>
            </Grid>
            <Grid item>
                <label htmlFor="odg" style={{display: 'block'}}>odg:</label>
                <div id="odg">{selectedClaim.odg ? <ClickableInfo title="odg" value={selectedClaim.odg} /> : <ClickableInfo title="odg" value="--" />}</div>
            </Grid></>}
            <Grid item>
                <label htmlFor="fuDrDate" style={{display: 'block'}}>FU w/ MD:</label>
                <div id="fuDrDate">{selectedClaim.fuDrDate ? <ClickableInfo title="fuDrDate" value={selectedClaim.fuDrDateFormat} /> : <ClickableInfo title="fuDrDate" value="--/--/----" />}</div>
            </Grid>
            <Grid item>
                <label htmlFor="jurisdiction" style={{display: 'block'}}>Juris:</label>
                <div id="jurisdiction">{selectedClaim.jurisdiction ? <ClickableInfo title="jurisdiction" value={selectedClaim.jurisdiction} /> : <ClickableInfo title="jurisdiction" value="--" />}</div>
            </Grid>
            <Box width="100%"/>
            {/* <Grid item xs={12}><hr /></Grid> */}
            <Grid item>
                <label htmlFor="bodyPart" style={{display: 'block'}}>BodyPart:</label>
                <div id="bodyPart">{selectedClaim.bodyPart ? <ClickableInfo title="bodyPart" value={selectedClaim.bodyPart} /> : <ClickableInfo title="bodyPart" value="-- --" />}</div>
            </Grid>
            <Grid item>
                <label htmlFor="icd10" style={{display: 'block'}}>ICD10:</label>
                <div id="icd10">{selectedClaim.icd10 ? <ClickableInfo title="icd10" value={selectedClaim.icd10} /> : <ClickableInfo title="icd10" value="-- --" />}</div>
            </Grid>
            {selectedClaim.rrLastWorked && 
            <Grid item>
                <label htmlFor="rrLastWorked" style={{display: 'block'}}>RR Last Worked:</label>
                <div id="rrLastWorked">{selectedClaim.rrLastWorked}</div>
            </Grid>
            }
            {selectedClaim.rrLastWorked && 
            <Grid item>
                <label htmlFor="rrFaxReceived" style={{display: 'block'}}>RR Fax Rec'd:</label>
                <div id="rrFaxReceived">{selectedClaim.rrFaxReceived ? <ClickableInfo title="rrFaxReceived" value={selectedClaim.rrFaxReceived} /> : <ClickableInfo title="rrFaxReceived" value="--" />}</div>
            </Grid>
            }
            <Box width="100%"/>
            <Grid item>
                <label htmlFor="referralDate" style={{display: 'block'}}>Referred:</label>
                <div id="referralDate">{selectedClaim.referralDate ? selectedClaim.referralDateFormat : "???Uh-Oh???"}</div>
            </Grid>
            <Grid item>
                <label htmlFor="scheduleDate" style={{display: 'block'}}>Scheduled:</label>
                <div id="scheduleDate">{selectedClaim.scheduleDate ? selectedClaim.scheduleDateFormat : "--/--/----"}</div>
            </Grid>
            <Box width="100%"/>
            <Grid item>
                <label htmlFor="apptDate" style={{display: 'block'}}>Appointment:</label>
                <div id="apptDate">
                    {(selectedClaim.apptDate && selectedClaim.apptTime) && <ClickableInfo title="apptTime" value={`${selectedClaim.apptDateFormat} @ ${selectedClaim.apptTime}`} />}
                    {(selectedClaim.apptDate && !selectedClaim.apptTime) && <ClickableInfo title="apptTime" value={`${selectedClaim.apptDateFormat} @ --:-- --`} />}
                    {(!selectedClaim.apptDate && selectedClaim.apptTime) && <ClickableInfo title="apptTime" value={`--/--/---- @ ${selectedClaim.apptTime}`} />}
                    {(!selectedClaim.apptDate && !selectedClaim.apptTime) && <ClickableInfo title="apptTime" value={`--/--/---- @ --:-- --`} />}
                </div>
            </Grid>
            <Box width="100%"/>
            <Grid item>
                <label>Confirmation:</label>
            </Grid>
            <Box width="100%"/>
            <Grid item>
                <label htmlFor="claimantVerbalConfirm" style={{display: 'block'}}>Verbal:</label>
                <div id="claimantVerbalConfirm">
                    {(selectedClaim.claimantVerbalConfirm === "Yes") ? <CheckIcon /> : <ClickableInfo title="claimantVerbalConfirm" value="--" />}
                </div>
            </Grid>
            {selectedClaim?.serviceGeneral === "FCE" &&
            <>
            <Grid item>
                <label htmlFor="claimantConfirmDayBefore" style={{display: 'block'}}>IW 24hr:</label>
                <div id="claimantConfirmDayBefore">
                    {(selectedClaim.claimantConfirmDayBefore) ? <CheckIcon /> : (selectedClaim.referralStatus === "Complete" ? <ClickableInfo title="claimantConfirmDayBefore" value="--" /> : "--")}
                </div>
            </Grid>
            <Grid item>
                <label htmlFor="ptConfirmDayBefore" style={{display: 'block'}}>PT 24hr:</label>
                <div id="ptConfirmDayBefore">
                    {(selectedClaim.ptConfirmDayBefore) ? <CheckIcon /> : (selectedClaim.referralStatus === "Complete" ? <ClickableInfo title="ptConfirmDayBefore" value="--" /> : "--")}
                </div>
            </Grid>
            </>
            }
            <Grid item>
                <label htmlFor="confirmAttend" style={{display: 'block'}}>Attend:</label>
                <div id="confirmAttend">
                    {(selectedClaim.confirmAttend === 'Yes') ? <CheckIcon /> : ((selectedClaim.confirmAttend === 'No') ? <CloseIcon /> : (selectedClaim.referralStatus === "Complete" ? <ClickableInfo title="confirmAttend" value="--" /> : "--"))}
                </div>
            </Grid>
            {selectedClaim.referralStatus === "Reschedule" && !selectedClaim.rescheduleFlag &&
            <Grid item>
                <button 
                name="rescheduleDOS" 
                onClick={(event) => {
                    selectedClaim.referralId && setAnchorEl(event.currentTarget?.parentNode);
                    setFieldUpdate("rescheduleDOS");
                }}>
                    Reschedule
                </button>
            </Grid>
            }
            <Grid item>
                <label htmlFor="reportReceivedDate" style={{display: 'block'}}>Report Rec'd:</label>
                <div id="reportReceivedDate">
                    {selectedClaim.reportReceivedDate ? selectedClaim.reportReceivedDate : (selectedClaim.confirmAttend === "Yes" ? <ClickableInfo title="reportReceivedDate" value="--/--/----" /> : "--/--/----")}
                </div>
            </Grid>
            <Box width="100%"/>
            <Grid item>
                <label htmlFor="confirmLetterToClaimant" style={{display: 'block'}}>CLetter to IW:</label>
                <div id="confirmLetterToClaimant">{selectedClaim.confirmLetterToClaimant ? selectedClaim.confirmLetterToClaimantDateFormat : <ClickableInfo title="confirmLetterToClaimant" value="--/--/----" />}</div>
            </Grid>
            <Grid item>
                <label htmlFor="confirmLetterToClaimantFormat" style={{display: 'block'}}>Format:</label>
                <div id="confirmLetterToClaimantFormat">{selectedClaim.confirmLetterToClaimantFormat ? selectedClaim.confirmLetterToClaimantFormat : "---"}</div>
            </Grid>
            <Grid item>
                <label htmlFor="confirmLetterToAdjuster" style={{display: 'block'}}>CLetter to Adj:</label>
                <div id="confirmLetterToAdjuster">{selectedClaim.confirmLetterToAdjuster ? selectedClaim.confirmLetterToAdjusterDateFormat : <ClickableInfo title="confirmLetterToAdjuster" value="--/--/----" />}</div>
            </Grid>
            <Grid item>
                <label htmlFor="confirmLetterToAdjusterFormat" style={{display: 'block'}}>Format:</label>
                <div id="confirmLetterToAdjusterFormat">{selectedClaim.confirmLetterToAdjusterFormat ? selectedClaim.confirmLetterToAdjusterFormat : "---"}</div>
            </Grid>
            <Box width="100%"/>
            {(selectedClaim.defenseAttorneyId || selectedClaim.plaintiffAttorneyId) &&
            <>
            <Grid item>
                <label htmlFor="confirmLetterToAttorney" style={{display: 'block'}}>CLetter to Att:</label>
                <div id="confirmLetterToAttorney">{selectedClaim.confirmLetterToAttorney ? selectedClaim.confirmLetterToAttorneyDateFormat : <ClickableInfo title="confirmLetterToAttorney" value="--/--/----" />}</div>
            </Grid>
            <Grid item>
                <label htmlFor="confirmLetterToAttorneyFormat" style={{display: 'block'}}>Format:</label>
                <div id="confirmLetterToAttorneyFormat">{selectedClaim.confirmLetterToAttorneyFormat ? selectedClaim.confirmLetterToAttorneyFormat : "---"}</div>
            </Grid>
            </>
            }
            <Grid item>
                <label htmlFor="medNotesToPT" style={{display: 'block'}}>Docs to PT:</label>
                <div id="medNotesToPT">{selectedClaim.medNotesToPT ? selectedClaim.medNotesToPTDateFormat : <ClickableInfo title="medNotesToPT" value="--/--/----" />}</div>
            </Grid>
            <Grid item>
                <label htmlFor="medNotesToPTFormat" style={{display: 'block'}}>Format:</label>
                <div id="medNotesToPTFormat">{selectedClaim.medNotesToPTFormat ? selectedClaim.medNotesToPTFormat : "---"}</div>
            </Grid>
            {selectedClaim.serviceGeneral === "FCE" && selectedClaim.reportReceivedDate && 
            <Grid item>
                <label htmlFor="fceApproved" style={{display: 'block'}}>FCE/PPD Approved:</label>
                <div id="fceApproved">{selectedClaim.fceApproved ? selectedClaim.fceApprovedFormat : <ClickableInfo title="fceApproved" value="--/--/----" />}</div>
            </Grid>
            }
            {selectedClaim.confirmAttend === 'Yes' && 
            <Grid item>
                <label htmlFor="confirmedPayor" style={{display: 'block'}}>Confirmed Payor:</label>
                <div id="confirmedPayor">{selectedClaim.confirmedPayor ? <CheckIcon /> : <ClickableInfo title="confirmedPayor" value="--" />}</div>
            </Grid>
            }
            <Box width="100%"/>
            <Grid item>
                <label htmlFor="reportToAdjuster" style={{display: 'block'}}>Report to Adj:</label>
                <div id="reportToAdjuster">{selectedClaim.reportToAdjuster ? selectedClaim.reportToAdjuster : (selectedClaim.reportReceivedDate ? <ClickableInfo title="reportToAdjuster" value="--/--/----" /> : "--/--/----")}</div>
            </Grid>
            <Grid item>
                <label htmlFor="reportToAdjusterFormat" style={{display: 'block'}}>Format:</label>
                <div id="reportToAdjusterFormat">{selectedClaim.reportToAdjusterFormat ? selectedClaim.reportToAdjusterFormat : "---"}</div>
            </Grid>
            <Grid item>
                <label htmlFor="reportToPhysician" style={{display: 'block'}}>Report to MD:</label>
                <div id="reportToPhysician">{selectedClaim.reportToPhysician ? selectedClaim.reportToPhysician : (selectedClaim.reportReceivedDate ? <ClickableInfo title="reportToPhysician" value="--/--/----" /> : "--/--/----")}</div>
            </Grid>
            <Grid item>
                <label htmlFor="reportToPhysicianFormat" style={{display: 'block'}}>Format:</label>
                <div id="reportToPhysicianFormat">{selectedClaim.reportToPhysicianFormat ? selectedClaim.reportToPhysicianFormat : "---"}</div>
            </Grid>
            {(selectedClaim.defenseAttorneyId || selectedClaim.plaintiffAttorneyId) &&
            <>
            <Grid item>
                <label htmlFor="reportToAttorney" style={{display: 'block'}}>Report to Att:</label>
                <div id="reportToAttorney">{selectedClaim.reportToAttorney ? selectedClaim.reportToAttorney : (selectedClaim.reportReceivedDate ? <ClickableInfo title="reportToAttorney" value="--/--/----" /> : "--/--/----")}</div>
            </Grid>
            <Grid item>
                <label htmlFor="reportToAttorneyFormat" style={{display: 'block'}}>Format:</label>
                <div id="reportToAttorneyFormat">{selectedClaim.reportToAttorneyFormat ? selectedClaim.reportToAttorneyFormat : "---"}</div>
            </Grid>
            </>
            }
            
        </Grid>
        <Menu
            id="info-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
        >     
            {fieldUpdate === "" && anchorEl?.id !== "rescheduleDOS" &&
            <MenuItem onClick={() => handleClickMenuUpdate()}>
                Update {anchorEl?.id}
            </MenuItem>
            }
            
            {fieldUpdate !== "" && 
            <MenuItem>
                {fieldUpdate === "assign" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    assign: '',
                }}
                validationSchema={Yup.object({
                    assign: Yup.string().required(),
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
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.assign}
                                        name="assign"
                                    >
                                        <option value={selectedClaim.assign}>{selectedClaim.assign}</option>
                                        {careCoordinators.filter((x) => x.Initials !== selectedClaim.assign).map((c) => (
                                            <option key={c.Initials} value={c.Initials}>{c.Initials}</option>
                                        ))}
                                    </select>
                                    {props.errors.assign && <div id="feedback">{props.errors.assign}</div>}
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
                {fieldUpdate === "referralStatus" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    referralStatus: '',
                }}
                validationSchema={Yup.object({
                    referralStatus: Yup.string().required(),
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
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.referralStatus}
                                        name="referralStatus"
                                    >
                                       <option value={selectedClaim.referralStatus}>{selectedClaim.referralStatus}</option>
                                        {[{status: "Open"}, {status: "Hold"}, {status: "Cancel"}].filter((x) => x.status !== selectedClaim.referralStatus).map((c) => (
                                            <option key={c.status} value={c.status}>{c.status}</option>
                                        ))}
                                    </select>
                                    {props.errors.referralStatus && <div id="feedback">{props.errors.referralStatus}</div>}
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
                {fieldUpdate === "ptStatus" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim?.referralId,
                    ptStatus: selectedClaim?.ptStatus ? selectedClaim?.ptStatus : '',
                    fuHoldNotes: selectedClaim?.fuHoldNotes ? selectedClaim?.fuHoldNotes : '',
                }}
                validationSchema={Yup.object({
                    ptStatus: Yup.string(),
                    fuHoldNotes: Yup.string(),
                })}
                onSubmit={(values, actions) => {
                    if (values?.ptStatus === selectedClaim?.ptStatus) {
                        if (values?.ptStatus === "Follow-Up" || values?.ptStatus === "Hold") {
                            if (values?.fuHoldNotes !== selectedClaim?.fuHoldNotes && values?.fuHoldNotes !== '') {
                                values = {
                                    referralId: values.referralId,
                                    fuHoldNotes: values.fuHoldNotes
                                };
                                mutationUpdate.mutate(values);
                                console.log("updating referral...", values);
                                // alert(JSON.stringify(values, null, 2));
                                // actions.resetForm();
                                actions.setSubmitting(false);
                                // setAddModalOpen(false);
                                // setModalParty('');
                                handleCloseMenu();
                                return;
                            }
                            else {
                                return;
                            }
                        }
                        else {
                            return;
                        }
                    }
                    else {
                        if (values?.ptStatus === "Active" || values?.ptStatus === "Discharge") {
                            values.fuHoldNotes = null;
                        }
                        if ((values?.ptStatus === "Follow-Up" || values?.ptStatus === "Hold") && values?.fuHoldNotes === '') {
                            return;
                        }
                        mutationUpdate.mutate(values);
                        console.log("updating referral out of FU/H...", values);
                        // alert(JSON.stringify(values, null, 2));
                        // actions.resetForm();
                        actions.setSubmitting(false);
                        // setAddModalOpen(false);
                        // setModalParty('');
                        handleCloseMenu();
                        return;
                    }
                }}
                >
                    {props => (
                        <Form>
                            <Grid container spacing={1.0}>
                                <Grid item>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.ptStatus}
                                        name="ptStatus"
                                    >
                                       <option value={selectedClaim.ptStatus}>{selectedClaim.ptStatus}</option>
                                        {[{status: "Active"}, {status: "Follow-Up"}, {status: "Hold"}, {status: "Discharge"}].filter((x) => x.status !== selectedClaim.ptStatus).map((c) => (
                                            <option key={c.status} value={c.status}>{c.status}</option>
                                        ))}
                                    </select>
                                    {props.errors.ptStatus && <div id="feedback">{props.errors.ptStatus}</div>}
                                    <br />
                                    <br />
                                    {(props.values?.ptStatus === "Follow-Up" || props.values?.ptStatus === "Hold") &&
                                    <>
                                        <select
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.fuHoldNotes}
                                            name="fuHoldNotes"
                                        >
                                        <option value={selectedClaim.fuHoldNotes}>{selectedClaim.fuHoldNotes}</option>
                                            {reasons.filter((r) => r !== selectedClaim.fuHoldNotes).map((c) => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                        {props.errors.fuHoldNotes && <div id="feedback">{props.errors.fuHoldNotes}</div>}
                                    </>
                                    }
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
                {fieldUpdate === "service" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    service: '',
                }}
                validationSchema={Yup.object({
                    service: Yup.string().required(),
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
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.service}
                                        name="service"
                                    >
                                       <option value={selectedClaim.service}>{selectedClaim.service}</option>
                                        {services.filter((x) => x.service !== selectedClaim.service).map((s) => (
                                            <option key={s.service} value={s.service}>{s.service}</option>
                                        ))}
                                    </select>
                                    {props.errors.service && <div id="feedback">{props.errors.service}</div>}
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
                {fieldUpdate === "approvedVisits" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    approvedVisits: '',
                }}
                validationSchema={Yup.object({
                    approvedVisits: Yup.string().required(),
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
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.approvedVisits}
                                        name="approvedVisits"
                                    >
                                       <option value={selectedClaim.approvedVisits}>{selectedClaim.approvedVisits}</option>
                                        {visitNumbers.filter((x) => x !== selectedClaim.approvedVisits).map((n) => (
                                            <option key={n} value={n}>{n}</option>
                                        ))}
                                    </select>
                                    {props.errors.approvedVisits && <div id="feedback">{props.errors.approvedVisits}</div>}
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
                {fieldUpdate === "odg" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    odg: selectedClaim.odg,
                }}
                validationSchema={Yup.object({
                    odg: Yup.number(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.odg}
                                        name="odg"
                                        type="number"
                                        min="0"
                                        max="50"
                                    />
                                    {props.errors.odg && <div id="feedback">{props.errors.odg}</div>}
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
                {fieldUpdate === "fuDrDate" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    fuDrDate: (selectedClaim.fuDrDate !== null) ? selectedClaim.fuDrDate : "",
                }}
                validationSchema={Yup.object({
                    fuDrDate: Yup.date().required(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={(props.values.fuDrDate !== null) ? props.values.fuDrDate : ""}
                                        name="fuDrDate"
                                        type="date"
                                    />
                                    {props.errors.fuDrDate && <div id="feedback">{props.errors.fuDrDate}</div>}
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
                {fieldUpdate === "jurisdiction" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    jurisdiction: '',
                }}
                validationSchema={Yup.object({
                    jurisdiction: Yup.string().required(),
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
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.jurisdiction}
                                        name="jurisdiction"
                                    >
                                       <option value={selectedClaim.jurisdiction}>{selectedClaim.jurisdiction}</option>
                                        {states.filter((x) => x.abbrev !== selectedClaim.jurisdiction).map((n) => (
                                            <option key={n.abbrev} value={n.abbrev}>{n.abbrev}</option>
                                        ))}
                                    </select>
                                    {props.errors.jurisdiction && <div id="feedback">{props.errors.jurisdiction}</div>}
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
                {fieldUpdate === "bodyPart" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    bodyPart: (selectedClaim.bodyPart !== null) ? selectedClaim.bodyPart : "",
                }}
                validationSchema={Yup.object({
                    bodyPart: Yup.string().required(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.bodyPart}
                                        name="bodyPart"
                                        type="text"
                                    />
                                    {props.errors.bodyPart && <div id="feedback">{props.errors.bodyPart}</div>}
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
                {fieldUpdate === "icd10" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    icd10: (selectedClaim.icd10 !== null) ? selectedClaim.icd10 : "",
                }}
                validationSchema={Yup.object({
                    icd10: Yup.string().required(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.icd10}
                                        name="icd10"
                                        type="text"
                                    />
                                    {props.errors.icd10 && <div id="feedback">{props.errors.icd10}</div>}
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
                
                {/* rrFaxReceived goes HERE */}
                {fieldUpdate === "rrFaxReceived" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    rrFaxReceived: (selectedClaim.rrFaxReceived !== null) ? selectedClaim.rrFaxReceived : "",
                }}
                validationSchema={Yup.object({
                    rrFaxReceived: Yup.date().required(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={(props.values.rrFaxReceived !== null) ? props.values.rrFaxReceived : ""}
                                        name="rrFaxReceived"
                                        type="date"
                                    />
                                    {props.errors.rrFaxReceived && <div id="feedback">{props.errors.rrFaxReceived}</div>}
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

                {fieldUpdate === "apptDate" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    apptDate: (selectedClaim.apptDate !== null) ? selectedClaim.apptDate : "",
                    apptTime: (selectedClaim.apptTime !== null) ? selectedClaim.apptTime : "",
                }}
                validationSchema={Yup.object({
                    apptDate: Yup.date().required(),
                    apptTime: Yup.string().required(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.apptDate}
                                        name="apptDate"
                                        type="date"
                                    />
                                    {/* {props.errors.apptDate && <div id="feedback">{props.errors.apptDate}</div>} */}
                                </Grid>
                                <Grid item>
                                    {"@"}
                                </Grid>
                                <Grid item>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.apptTime}
                                        name="apptTime"
                                    >
                                        {selectedClaim.apptTime !== "" 
                                            ?<><option value={selectedClaim.apptTime}>{selectedClaim.apptTime}</option><option value="">{"--"}</option></>
                                            :<option value="">{"--"}</option>}
                                        {times.filter((x) => x.Time !== selectedClaim.apptTime).map((t) => (
                                            <option key={t.Time} value={t.Time}>{t.Time}</option>
                                        ))}
                                    </select>
                                    {/* {props.errors.apptTime && <div id="feedback">{props.errors.apptTime}</div>} */}
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
                {fieldUpdate === "rescheduleDOS" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    rescheduleDOS: (selectedClaim.rescheduleDOS !== null) ? selectedClaim.rescheduleDOS : "",
                    rescheduleTime: (selectedClaim.rescheduleTime !== null) ? selectedClaim.rescheduleTime : "",
                }}
                validationSchema={Yup.object({
                    rescheduleDOS: Yup.date().required(),
                    rescheduleTime: Yup.string().required(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.rescheduleDOS}
                                        name="rescheduleDOS"
                                        type="date"
                                    />
                                    {props.errors.rescheduleDOS && <div id="feedback">{props.errors.rescheduleDOS}</div>}
                                </Grid>
                                <Grid item>
                                    {"@"}
                                </Grid>
                                <Grid item>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.rescheduleTime}
                                        name="rescheduleTime"
                                    >
                                        {selectedClaim.rescheduleTime !== "" 
                                            ?<><option value={selectedClaim.rescheduleTime}>{selectedClaim.rescheduleTime}</option><option value="">{"--"}</option></>
                                            :<option value="">{"--"}</option>}
                                        {times.filter((x) => x.Time !== selectedClaim.rescheduleTime).map((t) => (
                                            <option key={t.Time} value={t.Time}>{t.Time}</option>
                                        ))}
                                    </select>
                                    {props.errors.rescheduleTime && <div id="feedback">{props.errors.rescheduleTime}</div>}
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
                {fieldUpdate === "claimantVerbalConfirm" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    claimantVerbalConfirm: "Yes",
                }}
                validationSchema={Yup.object({
                    claimantVerbalConfirm: Yup.string().required(),
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
                                    <input type="hidden" name="claimantVerbalConfirm" value={props.values.claimantVerbalConfirm} />
                                    <button type="submit">Confirm</button>
                                    {props.errors.claimantVerbalConfirm && <div id="feedback">{props.errors.claimantVerbalConfirm}</div>}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>  
                </>
                }
                {fieldUpdate === "claimantConfirmDayBefore" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    claimantConfirmDayBefore: "Yes",
                }}
                validationSchema={Yup.object({
                    claimantConfirmDayBefore: Yup.string().required(),
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
                                    <input type="hidden" name="claimantConfirmDayBefore" value={props.values.claimantConfirmDayBefore} />
                                    <button type="submit">Confirm</button>
                                    {props.errors.claimantConfirmDayBefore && <div id="feedback">{props.errors.claimantConfirmDayBefore}</div>}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>  
                </>
                }
                {fieldUpdate === "ptConfirmDayBefore" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    ptConfirmDayBefore: "Yes",
                }}
                validationSchema={Yup.object({
                    ptConfirmDayBefore: Yup.string().required(),
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
                                    <input type="hidden" name="ptConfirmDayBefore" value={props.values.ptConfirmDayBefore} />
                                    <button type="submit">Confirm</button>
                                    {props.errors.ptConfirmDayBefore && <div id="feedback">{props.errors.ptConfirmDayBefore}</div>}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>  
                </>
                }
                {fieldUpdate === "confirmAttend" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    confirmAttend: "Yes",
                }}
                validationSchema={Yup.object({
                    confirmAttend: Yup.string().required(),
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
                                    <input type="hidden" name="confirmAttend" value={props.values.confirmAttend} />
                                    <button type="submit">Yes</button>
                                    {props.errors.confirmAttend && <div id="feedback">{props.errors.confirmAttend}</div>}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    confirmAttend: "No",
                }}
                validationSchema={Yup.object({
                    confirmAttend: Yup.string().required(),
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
                                    <input type="hidden" name="confirmAttend" value={props.values.confirmAttend} />
                                    <button type="submit">No</button>
                                    {props.errors.confirmAttend && <div id="feedback">{props.errors.confirmAttend}</div>}
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                </>
                }
                {fieldUpdate === "confirmLetterToClaimant" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    confirmLetterToClaimant: (selectedClaim.confirmLetterToClaimant !== null) ? selectedClaim.confirmLetterToClaimant : "",
                    confirmLetterToClaimantFormat: (selectedClaim.confirmLetterToClaimantFormat !== null) ? selectedClaim.confirmLetterToClaimantFormat : "",
                }}
                validationSchema={Yup.object({
                    confirmLetterToClaimant: Yup.date().required(),
                    confirmLetterToClaimantFormat: Yup.string().required(),
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
                                    <label htmlFor="confirmLetterToClaimant">Date:</label>
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.confirmLetterToClaimant}
                                        name="confirmLetterToClaimant"
                                        type="date"
                                        id="confirmLetterToClaimant"
                                    />
                                </Grid>
                                <Grid item>
                                    <label htmlFor="confirmLetterToClaimantFormat">Format:</label>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.confirmLetterToClaimantFormat}
                                        name="confirmLetterToClaimantFormat"
                                        id="confirmLetterToClaimantFormat"
                                    >
                                        {(selectedClaim.confirmLetterToClaimantFormat !== "") && (selectedClaim.confirmLetterToClaimantFormat !== null)
                                            ?
                                            <>
                                            <option value={selectedClaim.confirmLetterToClaimantFormat}>{selectedClaim.confirmLetterToClaimantFormat}</option>
                                            <option value="">{"--"}</option>
                                            </>
                                            :
                                            <option value="">{"--"}</option>
                                        }
                                        {["Text","Email","Mail"].filter((x) => x !== selectedClaim.confirmLetterToClaimantFormat).map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
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
                {fieldUpdate === "confirmLetterToAdjuster" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    confirmLetterToAdjuster: (selectedClaim.confirmLetterToAdjuster !== null) ? selectedClaim.confirmLetterToAdjuster : "",
                    confirmLetterToAdjusterFormat: (selectedClaim.confirmLetterToAdjusterFormat !== null) ? selectedClaim.confirmLetterToAdjusterFormat : "",
                }}
                validationSchema={Yup.object({
                    confirmLetterToAdjuster: Yup.date().required(),
                    confirmLetterToAdjusterFormat: Yup.string().required(),
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
                                    <label htmlFor="confirmLetterToAdjuster">Date:</label>
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.confirmLetterToAdjuster}
                                        name="confirmLetterToAdjuster"
                                        type="date"
                                        id="confirmLetterToAdjuster"
                                    />
                                </Grid>
                                <Grid item>
                                    <label htmlFor="confirmLetterToAdjusterFormat">Format:</label>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.confirmLetterToAdjusterFormat}
                                        name="confirmLetterToAdjusterFormat"
                                        id="confirmLetterToAdjusterFormat"
                                    >
                                        {(selectedClaim.confirmLetterToAdjusterFormat !== "") && (selectedClaim.confirmLetterToAdjusterFormat !== null) 
                                            ?
                                            <>
                                            <option value={selectedClaim.confirmLetterToAdjusterFormat}>{selectedClaim.confirmLetterToAdjusterFormat}</option>
                                            <option value="">{"--"}</option>
                                            </>
                                            :
                                            <option value="">{"--"}</option>
                                        }
                                        {["Email","Fax"].filter((x) => x !== selectedClaim.confirmLetterToAdjusterFormat).map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
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
                {fieldUpdate === "confirmLetterToAttorney" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    confirmLetterToAttorney: (selectedClaim.confirmLetterToAttorney !== null) ? selectedClaim.confirmLetterToAttorney : "",
                    confirmLetterToAttorneyFormat: (selectedClaim.confirmLetterToAttorneyFormat !== null) ? selectedClaim.confirmLetterToAttorneyFormat : "",
                }}
                validationSchema={Yup.object({
                    confirmLetterToAttorney: Yup.date().required(),
                    confirmLetterToAttorneyFormat: Yup.string().required(),
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
                                    <label htmlFor="confirmLetterToAttorney" style={{display: 'block'}}>Date:</label>
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.confirmLetterToAttorney}
                                        name="confirmLetterToAttorney"
                                        type="date"
                                        id="confirmLetterToAttorney"
                                    />
                                </Grid>
                                <Grid item>
                                    <label htmlFor="confirmLetterToAttorneyFormat" style={{display: 'block'}}>Format:</label>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.confirmLetterToAttorneyFormat}
                                        name="confirmLetterToAttorneyFormat"
                                        id="confirmLetterToAttorneyFormat"
                                    >
                                        {(selectedClaim.confirmLetterToAttorneyFormat !== "") && (selectedClaim.confirmLetterToAttorneyFormat !== null) 
                                            ?
                                            <>
                                            <option value={selectedClaim.confirmLetterToAttorneyFormat}>{selectedClaim.confirmLetterToAttorneyFormat}</option>
                                            <option value="">{"--"}</option>
                                            </>
                                            :
                                            <option value="">{"--"}</option>
                                        }
                                        {["Email","Fax"].filter((x) => x !== selectedClaim.confirmLetterToAttorneyFormat).map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
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
                {fieldUpdate === "medNotesToPT" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    medNotesToPT: (selectedClaim.medNotesToPT !== null) ? selectedClaim.medNotesToPT : "",
                    medNotesToPTFormat: (selectedClaim.medNotesToPTFormat !== null) ? selectedClaim.medNotesToPTFormat : "",
                }}
                validationSchema={Yup.object({
                    medNotesToPT: Yup.date().required(),
                    medNotesToPTFormat: Yup.string().required(),
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
                                    <label htmlFor="medNotesToPT" style={{display: 'block'}}>Date:</label>
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.medNotesToPT}
                                        name="medNotesToPT"
                                        type="date"
                                        id="medNotesToPT"
                                    />                                    
                                </Grid>
                                <Grid item>
                                    <label htmlFor="medNotesToPTFormat" style={{display: 'block'}}>Format:</label>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.medNotesToPTFormat}
                                        name="medNotesToPTFormat"
                                        id="medNotesToPTFormat"
                                    >
                                        {(selectedClaim.medNotesToPTFormat !== "") && (selectedClaim.medNotesToPTFormat !== null) 
                                            ?
                                            <>
                                            <option value={selectedClaim.medNotesToPTFormat}>{selectedClaim.medNotesToPTFormat}</option>
                                            <option value="">{"--"}</option>
                                            </>
                                            :
                                            <option value="">{"--"}</option>
                                        }
                                        {["Email","Fax"].filter((x) => x !== selectedClaim.medNotesToPTFormat).map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
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
                {fieldUpdate === "reportReceivedDate" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    reportReceivedDate: (selectedClaim.reportReceivedDate !== null) ? selectedClaim.reportReceivedDate : "",
                }}
                validationSchema={Yup.object({
                    reportReceivedDate: Yup.date().required(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={(props.values.reportReceivedDate !== null) ? props.values.reportReceivedDate : ""}
                                        name="reportReceivedDate"
                                        type="date"
                                    />
                                    {props.errors.reportReceivedDate && <div id="feedback">{props.errors.reportReceivedDate}</div>}
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
                {fieldUpdate === "fceApproved" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    fceApproved: (selectedClaim.fceApproved !== null) ? selectedClaim.fceApproved : "",
                }}
                validationSchema={Yup.object({
                    fceApproved: Yup.date().required(),
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
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={(props.values.fceApproved !== null) ? props.values.fceApproved : ""}
                                        name="fceApproved"
                                        type="date"
                                    />
                                    {props.errors.fceApproved && <div id="feedback">{props.errors.fceApproved}</div>}
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
                {fieldUpdate === "reportToAdjuster" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    reportToAdjuster: (selectedClaim.reportToAdjuster !== null) ? selectedClaim.reportToAdjuster : "",
                    reportToAdjusterFormat: (selectedClaim.reportToAdjusterFormat !== null) ? selectedClaim.reportToAdjusterFormat : "",
                }}
                validationSchema={Yup.object({
                    reportToAdjuster: Yup.date().required(),
                    reportToAdjusterFormat: Yup.string().required(),
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
                                    <label htmlFor="reportToAdjuster" style={{display: 'block'}}>Date:</label>
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.reportToAdjuster}
                                        name="reportToAdjuster"
                                        type="date"
                                        id="reportToAdjuster"
                                    />
                                </Grid>
                                <Grid item>
                                    <label htmlFor="reportToAdjusterFormat" style={{display: 'block'}}>Format:</label>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.reportToAdjusterFormat}
                                        name="reportToAdjusterFormat"
                                        id="reportToAdjusterFormat"
                                    >
                                        {(selectedClaim.reportToAdjusterFormat !== "") && (selectedClaim.reportToAdjusterFormat !== null) 
                                            ?
                                            <>
                                            <option value={selectedClaim.reportToAdjusterFormat}>{selectedClaim.reportToAdjusterFormat}</option>
                                            <option value="">{"--"}</option>
                                            </>
                                            :
                                            <option value="">{"--"}</option>
                                        }
                                        {["Email","Fax"].filter((x) => x !== selectedClaim.reportToAdjusterFormat).map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
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
                {fieldUpdate === "reportToPhysician" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    reportToPhysician: (selectedClaim.reportToPhysician !== null) ? selectedClaim.reportToPhysician : "",
                    reportToPhysicianFormat: (selectedClaim.reportToPhysicianFormat !== null) ? selectedClaim.reportToPhysicianFormat : "",
                }}
                validationSchema={Yup.object({
                    reportToPhysician: Yup.date().required(),
                    reportToPhysicianFormat: Yup.string().required(),
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
                                    <label htmlFor="reportToPhysician" style={{display: 'block'}}>Date:</label>
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.reportToPhysician}
                                        name="reportToPhysician"
                                        type="date"
                                        id="reportToPhysician"
                                    />
                                </Grid>
                                <Grid item>
                                    <label htmlFor="reportToPhysicianFormat" style={{display: 'block'}}>Format:</label>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.reportToPhysicianFormat}
                                        name="reportToPhysicianFormat"
                                        id="reportToPhysicianFormat"
                                    >
                                        {(selectedClaim.reportToPhysicianFormat !== "") && (selectedClaim.reportToPhysicianFormat !== null) 
                                            ?
                                            <>
                                            <option value={selectedClaim.reportToPhysicianFormat}>{selectedClaim.reportToPhysicianFormat}</option>
                                            <option value="">{"--"}</option>
                                            </>
                                            :
                                            <option value="">{"--"}</option>
                                        }
                                        {["Email","Fax"].filter((x) => x !== selectedClaim.reportToPhysicianFormat).map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
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
                {fieldUpdate === "reportToAttorney" && 
                <>
                <Formik
                initialValues={{
                    referralId: selectedClaim.referralId,
                    reportToAttorney: (selectedClaim.reportToAttorney !== null) ? selectedClaim.reportToAttorney : "",
                    reportToAttorneyFormat: (selectedClaim.reportToAttorneyFormat !== null) ? selectedClaim.reportToAttorneyFormat : "",
                }}
                validationSchema={Yup.object({
                    reportToAttorney: Yup.date().required(),
                    reportToAttorneyFormat: Yup.string().required(),
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
                                    <label htmlFor="reportToAttorney" style={{display: 'block'}}>Date:</label>
                                    <input
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.reportToAttorney}
                                        name="reportToAttorney"
                                        type="date"
                                        id="reportToAttorney"
                                    />
                                </Grid>
                                <Grid item>
                                    <label htmlFor="reportToAttorneyFormat" style={{display: 'block'}}>Format:</label>
                                    <select
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.reportToAttorneyFormat}
                                        name="reportToAttorneyFormat"
                                        id="reportToAttorneyFormat"
                                    >
                                        {(selectedClaim.reportToAttorneyFormat !== "") && (selectedClaim.reportToAttorneyFormat !== null) 
                                            ?
                                            <>
                                            <option value={selectedClaim.reportToAttorneyFormat}>{selectedClaim.reportToAttorneyFormat}</option>
                                            <option value="">{"--"}</option>
                                            </>
                                            :
                                            <option value="">{"--"}</option>
                                        }
                                        {["Email","Fax"].filter((x) => x !== selectedClaim.reportToAttorneyFormat).map((f) => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </select>
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