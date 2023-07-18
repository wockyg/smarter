import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

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
        <div>
            <Accordion>
                <AccordionSummary
                expandIcon={<InsertEmoticonIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Adjuster:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>Case Manager(s):</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>Physician:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
                >
                <Typography>Attorney(s):</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="panel5a-header"
                >
                <Typography>Therapist:</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
        }
        </>
    );

}