import Grid from '@mui/material/Grid';

import useGetReferralVisits from '../hooks/useGetReferralVisits';
import useGetReferralAuth from '../hooks/useGetReferralAuth';
import useGetReferral from '../hooks/useGetReferral';

import { useParams } from 'react-router-dom';

export default function VisitTally(props) {

    let { id: linkId } = useParams();

    const { status: statusReferrals, data: selectedClaim, error: errorReferrals, isFetching: isFetchingReferrals } = useGetReferral(+linkId);

    const { status: statusAuth, data: auth, error: errorAuth, isFetching: isFetchingAuth } = useGetReferralAuth(linkId);
    const { status: statusVisits, data: visits, error: errorVisits, isFetching: isFetchingVisits } = useGetReferralVisits(linkId);

    const totalAuthVisits = auth?.length > 0 && auth.map((a) => a.approvedVisits).reduce((partial, t) => partial + t, 0);

    const visitCountYes = visits?.length > 0 && visits.filter((v) => v.attend === 'Yes').length;
    const visitCountNo = visits?.length > 0 && visits.filter((v) => v.attend === 'No').length;
    const visitCountBlank = visits?.length > 0 && visits.filter((v) => v.attend === null).length;

    return (
        <>
        {selectedClaim?.referralId && auth?.length > 0 &&
        <div>
            <Grid container spacing={2}>
                <Grid item>
                    <div style={{fontSize: 13, textAlign: "left"}}>
                        <br />
                        {totalAuthVisits} Total Authorized visits<br />
                        <hr />
                        {visitCountYes} Total attended visits (Yes)<br />
                        {visitCountBlank} Total visits remaining (Blank)<br />
                        <hr />
                        {visitCountNo} Total Missed visits (No)
                    </div>
                </Grid>
            </Grid>
        </div>
        }
        </>);
}