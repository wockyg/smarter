import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import useGetReferral from '../hooks/useGetReferral';
import useGetReferralsClaimant from '../hooks/useGetReferralsClaimant';

import { useNavigate } from "react-router-dom";


export default function MultipleClaimsWidget(props) {


    const { selectedClaim } = props;
    const { status: status, data: allClaims, error: error, isFetching: isFetching } = useGetReferralsClaimant(selectedClaim?.claimantId);
    
    const navigate = useNavigate();

    return (
      selectedClaim && allClaims && allClaims.length > 1 &&
      
      <Box sx={{ width: '100%' }}>
        Multiple Files Widget:<br />
        <ul>
          {allClaims.map((c, i) => {
          return <li key={i} style={{cursor: 'pointer', background: c.referralId === selectedClaim.referralId && '#25A8E5', borderRadius: 10, padding: 2}} onClick={() => navigate(`/${c.referralId}`)}>{`${c.bodyPart} (${c.service}) ${c.ptStatus}`}</li>
        })}
        </ul>
      </Box>
    
    );
}