import { useState, useContext } from 'react';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Grid from '@mui/material/Grid';

import { visitNumbers } from '../lookup-tables/lookup_visitNumbers';

import useGetReferralVisits from '../hooks/useGetReferralVisits';
import useGetReferralAuth from '../hooks/useGetReferralAuth';
import useAddReferralAuth from '../hooks/useAddReferralAuth';
import useGetReferral from '../hooks/useGetReferral';
import useUpdateReferral from '../hooks/useUpdateReferral';

import { display } from '@mui/system';

import { useParams } from 'react-router-dom';

import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';

import emailjs from '@emailjs/browser';

export default function AuthorizationTable(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    // const selectedClaim = referrals.length > 0 && referrals.filter((row) => row.referralId === +linkId)[0];

    const { status: statusAuth, data: auth, error: errorAuth, isFetching: isFetchingAuth } = useGetReferralAuth(linkId);
    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetReferralVisits(linkId);

    const referralUpdate = useUpdateReferral();

    const totalAuthVisits = auth?.length > 0 && auth.map((a) => a.approvedVisits).reduce((partial, t) => partial + t, 0);

    const visitCountYes = visits?.length > 0 && visits.filter((v) => v.attend === 'Yes').length;
    const visitCountNo = visits?.length > 0 && visits.filter((v) => v.attend === 'No').length;
    const visitCountBlank = visits?.length > 0 && visits.filter((v) => v.attend === null).length;

    const adjUpdateVisits = visits?.length > 0 && selectedClaim && visits.filter((v) => new Date(v.dos) > new Date(selectedClaim.lastAdjUpdateSent));

    const [newAuth, setNewAuth] = useState({});

    const [ccOverride, setCCOverride] = useState('');

    const mutationUpdate = useAddReferralAuth();

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
                                                        ${(visitCountYes >= 24 || selectedClaim.adjusterClientId === 68 || selectedClaim.claimantEmployerId === 317) && '<td>ODG Recommendation</td>'}
                                                    </tr>
                                                    <tr>
                                                        <td>${selectedClaim?.claimant}</td>
                                                        <td>${totalAuthVisits}</td>
                                                        <td>${visitCountYes}</td>
                                                        ${(visitCountYes >= 24 || selectedClaim.adjusterClientId === 68 || selectedClaim.claimantEmployerId === 317) && `<td>${selectedClaim.odg}</td>`}
                                                    </tr>
                                                </table>
                                                <br>
                                                ${emailStatement1PN}
                                                <br>
                                                <ul>
                                                    ${adjUpdateVisits?.map((v) => v.attend ? `<li>${v.dosFormat} ${v.attend === 'Yes' ? ' - attended' : ' - did not attend'} </li>` : `<li>${v.dosFormat} at ${v.time}</li>`)}
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
                                                        ${(visitCountYes >= 24 || selectedClaim.adjusterClientId === 68 || selectedClaim.claimantEmployerId === 317) && '<td>ODG Recommendation</td>'}
                                                    </tr>
                                                    <tr>
                                                        <td>${selectedClaim?.claimant}</td>
                                                        <td>${totalAuthVisits}</td>
                                                        <td>${visitCountYes}</td>
                                                        ${(visitCountYes >= 24 || selectedClaim.adjusterClientId === 68 || selectedClaim.claimantEmployerId === 317) && `<td>${selectedClaim.odg}</td>`}
                                                    </tr>
                                                </table>
                                                <br>
                                                ${emailStatement1IA}
                                                <br>
                                                <ul>
                                                    ${adjUpdateVisits?.map((v) => v.attend ? `<li>${v.dosFormat} ${v.attend === 'Yes' ? ' - attended' : ' - did not attend'} </li>` : `<li>${v.dosFormat} at ${v.time}</li>`)}
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

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
            return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const handleChangeAuth = (e, key) => {
        setNewAuth({...newAuth, [key]: e.target.value});
    }

    const handleAddAuth = () => {
        const a = {...newAuth, referralId: selectedClaim?.referralId};
        if (a.approvedVisits && a.referralId) {
            mutationUpdate.mutate(a);
        }
    }

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
                    <TableContainer component={Paper} sx={{border: 1}}>
                        <Table size="small" aria-label="dptAuthorization table">
                        <TableBody>
                            <TableRow>
                                <TableCell />
                                <TableCell>

                                <select 
                                name="approvedVisits" 
                                value={newAuth?.approvedVisits ? newAuth.approvedVisits : ""} 
                                onChange={(event) => handleChangeAuth(event, 'approvedVisits')}
                                >
                                    <option value="">--</option>
                                    {visitNumbers.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                                <AddBoxIcon sx={{cursor: "pointer"}} onClick={() => handleAddAuth()} />
                                </TableCell>
                            </TableRow>
                            
                            {stableSort(auth, getComparator('asc', 'authId')).map((row, i) => (
                            <TableRow key={row.authId}>
                                <TableCell sx={{border: 1}} align="left">{i+1}</TableCell>
                                <TableCell sx={{border: 1}} align="left">{row.approvedVisits}</TableCell>
                                {/* <TableCell sx={{border: 1}} align="left">{row.dateAdded}</TableCell> */}
                                <TableCell align="left">
                                <button 
                                onClick={() => {
                                    // mutationDelete.mutate({ noteId: `${row.billingId}` });
                                }}
                                variant="outlined">x</button>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item>
                    <div style={{fontSize: 13, textAlign: "left"}}>
                        {totalAuthVisits} Total Authorized visits<br />
                        <hr />
                        {visitCountYes} Total attended visits (Yes)<br />
                        {visitCountBlank} Total visits remaining (Blank)<br />
                        <hr />
                        {visitCountNo} Total Missed visits (No)
                    </div>
                </Grid>
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