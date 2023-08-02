import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

import useUpdateReferral from '../hooks/useUpdateReferral';

import AdjusterDetails from '../details/AdjusterDetails';
import CasemanagerDetails from '../details/CasemanagerDetails';
import ClientDetails from '../details/ClientDetails';
import ClaimantDetails from '../details/ClaimantDetails';
import EmployerDetails from '../details/EmployerDetails';
import PhysicianDetails from '../details/PhysicianDetails';
import TherapistDetails from '../details/TherapistDetails';
import AttorneyDetails from '../details/AttorneyDetails';
import EditToolbarSolo from '../details/EditToolbarSolo';

import { DetailsContext } from '../contexts/DetailsContext';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import "../App.css"

export default function ClaimIdInfoAccordian(props) {

    const { selectedClaim } = props;

    const mutationUpdate = useUpdateReferral();

    const { currentlyEditingSelectedClaim: currentlyEditing, setCurrentlyEditingSelectedClaim: setCurrentlyEditing } = useContext(DetailsContext);

    function SubmitButton(){
        return <button type="submit">Ok</button>
    }

    return (
        <>
        {selectedClaim &&
        <>
        <div>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Grid container>
                        <Grid item>
                            <label htmlFor="claimantId">Claimant:</label>
                        </Grid>
                        {selectedClaim.claimantId &&
                        <>
                        <Box width="100%"/>
                        <Grid item>
                            <div id="claimantId">{`${selectedClaim.claimant} | DOB: ${selectedClaim?.claimantBirthDateFormat} | DOI: ${selectedClaim?.claimantInjuryDate1Format}`}</div>
                        </Grid>
                        </>
                        }
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <ClaimantDetails detailsId={selectedClaim.claimantId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />
                </AccordionDetails>
            </Accordion>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Grid container>
                        <Grid item>
                            <label htmlFor="adjusterId">Adjuster:</label>
                        </Grid>
                        {selectedClaim.adjusterId &&
                        <>
                        <Box width="100%"/>
                        <Grid item>
                            <div id="adjusterId">{`${selectedClaim.adjuster} | ${selectedClaim.adjusterClient}`}</div>
                        </Grid>
                        </>
                        }
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {selectedClaim.adjusterId ?
                    <AdjusterDetails detailsId={selectedClaim.adjusterId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />
                    :
                    <EditToolbarSolo
                    selectedParty='adjuster'
                    currentlyEditing={currentlyEditing}
                    setCurrentlyEditing={setCurrentlyEditing}
                    />
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                    <Grid container>
                        <Grid item>
                            <label htmlFor="casemanagerId">Case Manager(s):</label>
                        </Grid>
                        {selectedClaim.casemanagerId &&
                        <>
                        <Box width="100%"/>
                        <Grid item>
                            <div id="casemanagerId">{selectedClaim.casemanagerId ? `${selectedClaim.casemanager} | ${selectedClaim.casemanagerClient}` : <></>}</div>
                        </Grid>
                        </>
                        }
                        {selectedClaim.casemanager2Id &&
                        <>
                        <Box width="100%"/>
                        <Grid item>
                            <div id="casemanager2Id">{`${selectedClaim.casemanager2} | ${selectedClaim.casemanager2Client}`}</div>
                        </Grid>
                        </>
                        }
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {selectedClaim.casemanagerId ?
                    <CasemanagerDetails detailsId={selectedClaim.casemanagerId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />
                    :
                    <EditToolbarSolo
                    selectedParty='casemanager'
                    currentlyEditing={currentlyEditing}
                    setCurrentlyEditing={setCurrentlyEditing}
                    />
                    }
                    {selectedClaim.casemanager2Id &&
                    <CasemanagerDetails detailsId={selectedClaim.casemanager2Id} cm2={true} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                    <Grid container>
                        <Grid item>
                            <label htmlFor="physicianId">Physician:</label>
                        </Grid>
                        {selectedClaim.physicianId &&
                        <>
                        <Box width="100%"/>
                        <Grid item>
                            <div id="physicianId">{`${selectedClaim.physicianLast}, ${selectedClaim.physicianFirst} | ${selectedClaim.physicianFacility}`}</div>
                        </Grid>
                        </>
                        }
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {selectedClaim.physicianId ?
                    <PhysicianDetails detailsId={selectedClaim.physicianId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />
                    :
                    <EditToolbarSolo
                    selectedParty='physician'
                    currentlyEditing={currentlyEditing}
                    setCurrentlyEditing={setCurrentlyEditing}
                    />
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
                >
                    <Grid container>
                        <Grid item>
                            <label htmlFor="plaintiffAttorneyId">Attorney(s):</label>
                        </Grid>
                        {selectedClaim.plaintiffAttorneyId &&
                        <>
                        <Box width="100%"/>
                        <Grid item>
                            <div id="plaintiffAttorneyId">{`(P) ${selectedClaim.plaintiffAttorney} | ${selectedClaim.plaintiffAttorneyFirm}`}</div>
                        </Grid>
                        </>
                        }
                        {selectedClaim.defenseAttorneyId &&
                        <>
                        <Box width="100%"/>
                        <Grid item>
                            <div id="defenseAttorneyId">{`(D) ${selectedClaim.defenseAttorney} | ${selectedClaim.defenseAttorneyFirm}`}</div>
                        </Grid>
                        </>
                        }
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {(!selectedClaim.defenseAttorneyId && !selectedClaim.plaintiffAttorneyId) ?
                    <EditToolbarSolo
                    selectedParty='attorney'
                    currentlyEditing={currentlyEditing}
                    setCurrentlyEditing={setCurrentlyEditing}
                    />
                    :
                    <>
                    {selectedClaim.defenseAttorney &&
                    <AttorneyDetails type='defenseAttorney' detailsId={selectedClaim.defenseAttorneyId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />
                    }
                    {selectedClaim.plaintiffAttorneyId &&
                    <AttorneyDetails type='plaintiffAttorney' detailsId={selectedClaim.plaintiffAttorneyId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />
                    }
                    </>
                    }
                </AccordionDetails>
            </Accordion>
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="panel5a-header"
                >
                    <Grid container>
                        <Grid item>
                            <label htmlFor="therapistId">Therapist:</label>
                        </Grid>
                        <Box width="100%"/>
                        <Grid item>
                            <div id="therapistId">
                                {selectedClaim.therapistId && 
                                <>
                                {`${selectedClaim.therapist}`}<br />
                                {`${selectedClaim.therapistAddress},${selectedClaim.therapistSuite ? ` Ste. ${selectedClaim.therapistSuite},` : ''} ${selectedClaim.therapistCity}, ${selectedClaim.therapistState} ${selectedClaim.therapistZip}`}<br />
                                {`P ${selectedClaim.therapistPhone}${selectedClaim.therapistPhoneExt ? ` x${selectedClaim.therapistPhoneExt}` : ''} :: F ${selectedClaim.therapistFax}`}
                                </> 
                                }
                            </div>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    {selectedClaim.therapistId ?
                    <TherapistDetails detailsId={selectedClaim.therapistId} currentlyEditing={currentlyEditing} setCurrentlyEditing={setCurrentlyEditing} />
                    :
                    <EditToolbarSolo
                    selectedParty='therapist'
                    currentlyEditing={currentlyEditing}
                    setCurrentlyEditing={setCurrentlyEditing}
                    />
                    }
                </AccordionDetails>
            </Accordion>
        </div>
        </>
        }
        </>
    );

}