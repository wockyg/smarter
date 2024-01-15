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
import { services } from '../lookup-tables/lookup_service';
import { weekdays } from '../lookup-tables/lookup_weekdays';

import emailjs from '@emailjs/browser';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


export default function AuthConfLetters(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    const [ccOverride, setCCOverride] = useState('');

    const handleConfEmail = () => {

        const serviceSpelledOut = selectedClaim && services.filter(s => s.service === selectedClaim?.service)[0].serviceSpelledOut;

        const today = new Date();
        const hours = today.getHours();
        const apptDate = new Date(selectedClaim.apptDate)
        const apptWeekday = apptDate.getDay();
        const apptMonth = apptDate.getMonth();
        const apptDay = apptDate.getDate();

        const apptDaySuffix = (apptDay === 1 || apptDay === 21 || apptDay === 31) ? 'st' : ((apptDay === 2 || apptDay === 22) ? 'nd' : (apptDay === 3 || apptDay === 23) ? 'rd' : 'th')

        const weekdayString = weekdays.filter(w => w.day === apptWeekday)[0].dayString;

        const emailBodyConf = 
        `<html>
            <body>
                Good ${hours < 12 ? 'morning' : 'afternoon'},
                <br>
                <br>
                Attached, please find the appointment confirmation letter advising of ${selectedClaim.claimantGender === 'Female' ? 'Ms.' : 'Mr.'} ${selectedClaim.claimantLast}'s ${serviceSpelledOut} ${selectedClaim.serviceGeneral === 'DPT' ? 'Evaluation' : ''} scheduled as follows:
                <br>
                <br>
                <u><strong>APPT DATE/TIME</strong></u>
                <br>
                ${weekdayString}, ${monthNames[apptMonth]} ${apptDay}${apptDaySuffix} at ${selectedClaim.apptTime}
                <br>
                <br>
                <u><strong>LOCATION</strong></u>
                <br>
                ${selectedClaim.therapist}
                <br>
                ${selectedClaim.therapistAddress}
                <br>
                ${selectedClaim.therapistCity}, ${selectedClaim.therapistState} ${selectedClaim.therapistZip}
                <br>
                <br>
                <u><strong>CONTACT</strong></u>
                <br>
                ${selectedClaim.therapistPhone}
                <br>
                <br>
                I have spoken with ${selectedClaim.claimantGender === 'Female' ? 'Ms.' : 'Mr.'} ${selectedClaim.claimantLast} and confirmed ${selectedClaim.claimantGender === 'Female' ? 'she' : 'he'} plans to attend.
            </body>
        </html>`;

        const ccEmail = careCoordinators.filter((el) => el.Initials === selectedClaim.assign)[0].email;

        const params = {
            to_email: 'wmcclure@definedpt.com',
            // to_email: ccOverride !== '' ? ccOverride : ccEmail,
            subject: `CLM# ${selectedClaim.claimNumber} ${selectedClaim.claimant} - ${serviceSpelledOut} ${selectedClaim.serviceGeneral === 'DPT' ? 'Evaluation' : ''} Scheduled`,
            message: emailBodyConf ? emailBodyConf : 'ERROR- PLEASE CONTACT SYSTEM ADMIN'
        }

        emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, '0mive5-lH56wNnNf7')
        .then((res) => {
            alert("Email sent successfully.");
            console.log(res.status, res.text);
            console.log(params);
        }, (err) => {
            console.log(err.text);
        });
        
    };

    const handleChangeCCOverride = (e) => {
        setCCOverride(e.target.value);
    }

    return (
        <>
        {selectedClaim?.apptDate && selectedClaim?.apptTime &&
        <>
        {/* <hr /> */}
        <label htmlFor="ccOverride"><u>CC Override:</u></label>
        <select 
        name="ccOverride" 
        value={ccOverride ? ccOverride : ""} 
        onChange={(event) => handleChangeCCOverride(event, 'ccOverride')}
        >
            <option value="">--</option>
            {careCoordinators.map((c) => <option key={c.TeamMember} value={c.email}>{c.Initials}</option>)}
        </select>
        <hr />
        <PDFDownloadLink document={<ConfirmationLetter selectedClaim={selectedClaim} />} fileName={`SCH Confirmation Letter - ${selectedClaim?.claimantLast}, ${selectedClaim?.claimantFirst}.pdf`}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading...' : <button onClick={handleConfEmail}>Conf. Letter</button>
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