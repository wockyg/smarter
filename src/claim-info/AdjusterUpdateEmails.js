import { useState, useContext } from 'react';
import Grid from '@mui/material/Grid';

import useGetReferralVisits from '../hooks/useGetReferralVisits';
import useGetReferralAuth from '../hooks/useGetReferralAuth';
import useGetReferral from '../hooks/useGetReferral';
import useUpdateReferral from '../hooks/useUpdateReferral';

import { useParams } from 'react-router-dom';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';

import emailjs from '@emailjs/browser';

export default function AdjusterUpdateEmails(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    // const selectedClaim = referrals.length > 0 && referrals.filter((row) => row.referralId === +linkId)[0];

    const { status: statusAuth, data: auth, error: errorAuth, isFetching: isFetchingAuth } = useGetReferralAuth(linkId);
    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetReferralVisits(linkId);

    const referralUpdate = useUpdateReferral();

    const totalAuthVisits = auth?.length > 0 && auth.map((a) => a.approvedVisits).reduce((partial, t) => partial + t, 0);

    const visitCountYes = visits?.length > 0 && visits.filter((v) => v.attend === 'Yes').length;

    const adjUpdateVisits = visits?.length > 0 && selectedClaim && visits.filter((v) => new Date(v.dos) > new Date(selectedClaim.lastAdjUpdateSent));

    const [ccOverride, setCCOverride] = useState('');

    const emailStatement1PN = selectedClaim && `Attached, please find the most recent progress note for ${selectedClaim.claimantGender === "Male" ? "Mr." : "Ms."} ${selectedClaim.claimantLast}. Please see below for a list of scheduled appointments:`;

    const emailStatement1IA = selectedClaim && `Attached, please find the initial assessment note for ${selectedClaim.claimantGender === "Male" ? "Mr." : "Ms."} ${selectedClaim.claimantLast}. Please see below for a list of scheduled appointments:`;

    const emailBodyPN = adjUpdateVisits && 
                                        `<html>
                                            <head>
                                                <style>
                                                    table, th, td {
                                                    border: 1px solid black !important;
                                                    }
                                                    th {
                                                    text-align: center !important;
                                                    }
                                                    td {
                                                    text-align: left !important;
                                                    }
                                                </style>
                                            </head>
                                            <body>
                                                <table>
                                                    <tr>
                                                        <td>Name</td>
                                                        <td>Authorized Visits</td>
                                                        <td>Attended Visits</td>
                                                        ${(visitCountYes >= 24 || selectedClaim.adjusterClientId === 68 || selectedClaim.claimantEmployerId === 317) ? '<td>ODG Recommendation</td>' : ''}
                                                    </tr>
                                                    <tr>
                                                        <td>${selectedClaim?.claimant}</td>
                                                        <td>${totalAuthVisits}</td>
                                                        <td>${visitCountYes}</td>
                                                        ${(visitCountYes >= 24 || selectedClaim.adjusterClientId === 68 || selectedClaim.claimantEmployerId === 317) ? `<td>${selectedClaim.odg}</td>` : ''}
                                                    </tr>
                                                </table>
                                                <br>
                                                ${emailStatement1PN}
                                                <br>
                                                <ul style="none">
                                                    ${adjUpdateVisits?.map((v) => v.attend ? `<li>${v.dosFormat} ${v.attend === 'Yes' ? ' - attended' : ' - did not attend'} </li>` : `<li>${v.dosFormat}${v.dosTime ? ` at ${v.dosTime}` : ''}</li>`).join(" ")}
                                                </ul>
                                                <br>
                                                This has also been sent to the doctor.
                                            </body>
                                        </html>`;

    const emailBodyIA = adjUpdateVisits && 
                                        `<html>
                                            <head>
                                                <style>
                                                    table, th, td {
                                                    border: 1px solid black !important;
                                                    }
                                                    th {
                                                    text-align: center !important;
                                                    }
                                                    td {
                                                    text-align: left !important;
                                                    }
                                                </style>
                                            </head>
                                            <body>
                                                <table>
                                                    <tr>
                                                        <td>Name</td>
                                                        <td>Authorized Visits</td>
                                                        <td>Attended Visits</td>
                                                        ${(visitCountYes >= 24 || selectedClaim.adjusterClientId === 68 || selectedClaim.claimantEmployerId === 317) ? '<td>ODG Recommendation</td>' : ''}
                                                    </tr>
                                                    <tr>
                                                        <td>${selectedClaim?.claimant}</td>
                                                        <td>${totalAuthVisits}</td>
                                                        <td>${visitCountYes}</td>
                                                        ${(visitCountYes >= 24 || selectedClaim.adjusterClientId === 68 || selectedClaim.claimantEmployerId === 317) ? `<td>${selectedClaim.odg}</td>` : ''}
                                                    </tr>
                                                </table>
                                                <br>
                                                ${emailStatement1IA}
                                                <br>
                                                <ul>
                                                    ${adjUpdateVisits?.map((v) => v.attend ? `<li>${v.dosFormat} ${v.attend === 'Yes' ? ' - attended' : ' - did not attend'} </li>` : `<li>${v.dosFormat}${v.dosTime ? ` at ${v.dosTime}` : ''}</li>`).join(" ")}
                                                </ul>
                                                <br>
                                                This has also been sent to the doctor.
                                            </body>
                                        </html>`;
                                        
    const emailBodyDC = adjUpdateVisits && 
                                        `<html>
                                            <body>
                                                Hello,
                                                <br>
                                                Attached, please find the therapy discharge note for ${selectedClaim.claimantGender === "Male" ? "Mr." : "Ms."} ${selectedClaim.claimantLast}.
                                                <br>
                                                This has also been sent to the doctor.
                                            </body>
                                        </html>`;   

    const handleChangeCCOverride = (e) => {
        setCCOverride(e.target.value);
    }

    const sendEmail = (values, type) => {
        const ccEmail = careCoordinators.filter((el) => el.Initials === values.assign)[0].email;
        const params = {
            to_email: ccOverride !== '' ? ccOverride : ccEmail,
            subject: `CLM# ${values.claimNumber} ${values.claimant} - Therapy ${type}`,
            message: type === 'Initial Assessment' ? emailBodyIA : (type === 'Progress Note' ? emailBodyPN : (type === 'Discharge Note' ? emailBodyDC : 'ERROR- PLEASE CONTACT SYSTEM ADMIN'))
        }
        emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, '0mive5-lH56wNnNf7')
        .then((res) => {
            alert("Email sent successfully.");
            console.log(res.status, res.text);
            console.log(params);
            referralUpdate.mutate({referralId: selectedClaim.referralId, lastAdjUpdateSent: new Date().toDateString()});
        }, (err) => {
            console.log(err.text);
        });
    };


    return (
        <>
        {selectedClaim?.referralId && auth?.length > 0 &&
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <label htmlFor="ccOverride"><u>CC Override:</u></label>
                    <select 
                    name="ccOverride" 
                    value={ccOverride ? ccOverride : ""} 
                    onChange={(event) => handleChangeCCOverride(event, 'ccOverride')}
                    >
                        <option value="">--</option>
                        {careCoordinators.map((c) => <option key={c.TeamMember} value={c.email}>{c.Initials}</option>)}
                    </select>
                    <button onClick={() => sendEmail(selectedClaim, 'Progress Note')}>{`PN Adj update email`}</button>
                    <button onClick={() => sendEmail(selectedClaim, 'Initial Assessment')}>{`IA Adj update email`}</button>
                    <button onClick={() => sendEmail(selectedClaim, 'Discharge Note')}>{`DC Adj update email`}</button>
                </Grid>
            </Grid>
        </div>
        }
        </>);
}