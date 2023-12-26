import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';

import ConfirmationLetter from '../document-templates/ConfirmationLetter';
import AuthorizationLetter from '../document-templates/AuthorizationLetter';
import PhysicianApprovalForm from '../document-templates/PhysicianApprovalForm';
import TherapistFaxCoverPage from '../document-templates/TherapistFaxCoverPage';

import { PDFDownloadLink } from '@react-pdf/renderer';

import useGetReferral from '../hooks/useGetReferral';

import { useParams } from 'react-router-dom';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';

export default function AuthConfLetters(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    return (
        <>
        {selectedClaim?.apptDate && selectedClaim?.apptTime &&
        <>
        <hr />
        <PDFDownloadLink document={<ConfirmationLetter selectedClaim={selectedClaim} />} fileName={`SCH Confirmation Letter - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading...' : <button>Conf. Letter</button>
                    }
        </PDFDownloadLink>
        <hr />
        <PDFDownloadLink document={<AuthorizationLetter selectedClaim={selectedClaim} />} fileName={`SCH ${selectedClaim?.service} Authorization Letter - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading...' : <button>Auth. Letter</button>
                    }
        </PDFDownloadLink>
        </>
        }
        {selectedClaim.serviceGeneral === "FCE" && selectedClaim.reportReceivedDate &&
        <>
        <hr />
        <PDFDownloadLink document={<PhysicianApprovalForm selectedClaim={selectedClaim} />} fileName={`${selectedClaim?.service} MD Approval Form - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading...' : <button>MD Approval Form</button>
                    }
        </PDFDownloadLink>
        </>
        }
        {selectedClaim.serviceGeneral === "FCE" &&
        <>
        <hr />
        <PDFDownloadLink document={<TherapistFaxCoverPage selectedClaim={selectedClaim} />} fileName={`SCH Fax Cover Page to PT for ${selectedClaim?.service} - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading...' : <button>PT Fax Cover Page</button>
                    }
        </PDFDownloadLink>
        </>
        }
        </>);
}