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
import Paper from '@mui/material/Paper';

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

export default function RecordsRequestClaimInfo(props) {

    const { selectedClaim } = props;

    const mutationUpdate = useUpdateReferral();

    const { currentlyEditingSelectedClaim: currentlyEditing, setCurrentlyEditingSelectedClaim: setCurrentlyEditing } = useContext(DetailsContext);

    return (

        // selectedClaim?.referralId &&
        
        <Paper square>
            <Box
            sx={{ 
                width: '100%', 
                // height: 120, 
                padding: 1, 
                // cursor: 'pointer', 
                backgroundImage: 'linear-gradient(to bottom right, rgba(66,175,230,0.5), rgba(66,175,230,1))'
            }}
            >
                <Grid container spacing={2}>
                    <Grid item>
                        <label htmlFor="claimant" style={{display: 'block'}}>Claimant:</label>
                        <div id="claimant">
                            {selectedClaim.claimant || "??"} ({selectedClaim.claimantGender.slice(0,1) || "??"})<br />
                            DOB: {selectedClaim.claimantBirthDate || "??"}
                        </div>
                    </Grid>
                    <Grid item>
                        <label htmlFor="claimNumber" style={{display: 'block'}}>Claim #:</label>
                        <div id="claimNumber">
                            {selectedClaim.claimNumber || "??"}
                        </div>
                    </Grid>
                    <Grid item>
                        <label htmlFor="bodyPart" style={{display: 'block'}}>Body Part:</label>
                        <div id="bodyPart">
                            {selectedClaim.bodyPart || "??"}
                        </div>
                    </Grid>
                    <Grid item>
                        <label htmlFor="ptStatus" style={{display: 'block'}}>PT Status:</label>
                        <div id="ptStatus">
                            {selectedClaim.ptStatus || "??"}<br />
                            {(selectedClaim.ptStatus === 'Follow-Up' || selectedClaim.ptStatus === 'Hold') &&
                            `(${selectedClaim.fuHoldNotes || '??'})`
                            }
                        </div>
                    </Grid>
                    <Grid item>
                        <label htmlFor="assign" style={{display: 'block'}}>Assign:</label>
                        <div id="assign">
                            {selectedClaim.assign || "??"}
                        </div>
                    </Grid>
                    <Box width="100%"/>
                    <Grid item>
                        Therapist:<br />
                        {selectedClaim.therapist || "??"}<br />
                        {selectedClaim.therapistAddress || "??"}<br />
                        {selectedClaim.therapistCity || "??"}, {selectedClaim.therapistState || "??"} {selectedClaim.therapistZip || "??"}
                    </Grid>

                </Grid>
            </Box>
        </Paper>
                    
    );

}