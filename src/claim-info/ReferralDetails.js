import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import FlagIcon from '@mui/icons-material/Flag';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import InfoFromAdjusterUpdateForm from './InfoFromAdjusterUpdateForm';
import ClaimInfo from './ClaimInfo';
import ClaimIdInfoTooltip from './ClaimIdInfoTooltip';
import ClaimIdInfoAccordian from './ClaimIdInfoAccordian';
import ReferralNotes from './ReferralNotes';
import AuthorizationTable from './AuthorizationTable';
import AdjusterUpdateEmails from './AdjusterUpdateEmails';
import AuthConfLetters from './AuthConfLetters';
import VisitTally from './VisitTally';
import ReminderForm from './ReminderForm';



import useGetReferral from '../hooks/useGetReferral';
import useGetReferralNotesFlagged from '../hooks/useGetReferralNotesFlagged';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useParams } from 'react-router-dom';

export default function ReferralDetails(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);
    const { status: statusFlagged, data: flagged, error: errorFlagged, isFetching: isFetchingFlagged } = useGetReferralNotesFlagged(+linkId);

    const { page, setPage } = useContext(SelectedClaimContext);

    // const selectedClaim = referrals?.length > 0 && referrals?.filter((row) => {return (row.referralId === +linkId);})[0];

    return (
    <>
    {selectedClaim?.referralId &&
    <Grid container spacing={2.5}>

        <Grid item xs={2.5}>

            {/* Claim Info */}
            <Box sx={{border: 1}}>
                <ClaimInfo selectedClaim={selectedClaim} />
            </Box>    

        </Grid>

        <Grid item xs={1.5}>

            {/* <List>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <FlagIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Note goes here
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        <FlagIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider /> */}
      

            {/* Info from Adjuster */}
            {selectedClaim?.referralStatus === 'Complete' ?
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel8a-content"
                id="panel8a-header"
                >
                    Docs
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{border: 1}}>
                        <InfoFromAdjusterUpdateForm selectedClaim={selectedClaim} />
                    </Box>
                </AccordionDetails>
            </Accordion>
            :
            <Box sx={{border: 1}}>
                <InfoFromAdjusterUpdateForm selectedClaim={selectedClaim} />
            </Box>
            }

            <hr />

            {/* Letter Generators */}
            {((selectedClaim?.apptDate && selectedClaim?.apptTime) || selectedClaim?.serviceGeneral === "FCE")  &&
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    Letters (slow)
                </AccordionSummary>
                <AccordionDetails>
                    <AuthConfLetters />
                </AccordionDetails>
            </Accordion>
            }
            {selectedClaim.ptStatus !== null && selectedClaim.serviceGeneral === "DPT" &&
            <>
            <hr />
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    Adj Updates
                </AccordionSummary>
                <AccordionDetails>
                    <AdjusterUpdateEmails />           
                </AccordionDetails>
            </Accordion>
            <hr />
            {/* Authorization Table */}
            {/* <AuthorizationTable /> */}
            </>
            }

        </Grid>
        {/* Id Details */}
        <Grid item xs={3.5}>
            <Box sx={{border: 1}}>
                <ClaimIdInfoAccordian selectedClaim={selectedClaim} />
            </Box>
            {/* <VisitTally /> */}
        </Grid>
        {/* Referral Notes */}
        <Grid item xs={3.5}>
            <Grid container spacing={2}>
                <Grid item>
                    <Box sx={{border: 1}}>
                        <ReferralNotes selectedClaim={selectedClaim} page={page} setPage={setPage} />
                    </Box> 
                </Grid>
                <Box width='100%' />
                <Grid item>
                    {/* <Box width='100%' height={20}> */}
                        <ReminderForm selectedClaim={selectedClaim} />
                    {/* </Box>  */}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
    }
    </>
    );
}