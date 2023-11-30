import { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import InfoFromAdjusterUpdateForm from './InfoFromAdjusterUpdateForm';
import ClaimInfo from './ClaimInfo';
import ClaimIdInfoTooltip from './ClaimIdInfoTooltip';
import ClaimIdInfoAccordian from './ClaimIdInfoAccordian';
import ReferralNotes from './ReferralNotes';
import AuthorizationTable from './AuthorizationTable';
import AdjusterUpdateEmails from './AdjusterUpdateEmails';
import VisitTally from './VisitTally';
import ReminderForm from './ReminderForm';

import ConfirmationLetter from '../document-templates/ConfirmationLetter';
import AuthorizationLetter from '../document-templates/AuthorizationLetter';
import PhysicianApprovalForm from '../document-templates/PhysicianApprovalForm';
import TherapistFaxCoverPage from '../document-templates/TherapistFaxCoverPage';

import { PDFDownloadLink } from '@react-pdf/renderer';

import useGetReferral from '../hooks/useGetReferral';

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

import { useParams } from 'react-router-dom';

export default function ReferralDetails(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

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

            {/* Info from Adjuster */}
            <Box sx={{border: 1}}>
                <InfoFromAdjusterUpdateForm selectedClaim={selectedClaim} />
            </Box>

            <hr />

            {/* Letter Generators */}
            {((selectedClaim?.apptDate && selectedClaim?.apptTime) || selectedClaim?.serviceGeneral === "FCE")  &&
            <Accordion TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    Letters
                </AccordionSummary>
                <AccordionDetails>
                    {selectedClaim?.apptDate && selectedClaim?.apptTime &&
                    <>
                    <hr />
                    <PDFDownloadLink document={<ConfirmationLetter selectedClaim={selectedClaim} />} fileName={`SCH Confirmation Letter - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : <button>DL Conf. Letter</button>
                                }
                    </PDFDownloadLink>
                    <hr />
                    <PDFDownloadLink document={<AuthorizationLetter selectedClaim={selectedClaim} />} fileName={`SCH ${selectedClaim?.service} Authorization Letter - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : <button>DL Auth. Letter</button>
                                }
                    </PDFDownloadLink>
                    </>
                    }
                    {selectedClaim.serviceGeneral === "FCE" && selectedClaim.reportReceivedDate &&
                    <>
                    <hr />
                    <PDFDownloadLink document={<PhysicianApprovalForm selectedClaim={selectedClaim} />} fileName={`${selectedClaim?.service} MD Approval Form - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : <button>DL MD Approval Form</button>
                                }
                    </PDFDownloadLink>
                    </>
                    }
                    {selectedClaim.serviceGeneral === "FCE" &&
                    <>
                    <hr />
                    <PDFDownloadLink document={<TherapistFaxCoverPage selectedClaim={selectedClaim} />} fileName={`SCH Fax Cover Page to PT for ${selectedClaim?.service} - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : <button>DL PT Fax Cover Page</button>
                                }
                    </PDFDownloadLink>
                    </>
                    }            
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
            <AuthorizationTable />
            </>
            }

        </Grid>
        {/* Id Details */}
        <Grid item xs={3.5}>
            <Box sx={{border: 1}}>
                <ClaimIdInfoAccordian selectedClaim={selectedClaim} />
            </Box>
            <VisitTally />
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