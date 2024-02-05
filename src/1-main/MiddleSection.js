import { useContext } from 'react';

import useGetReferral from '../hooks/useGetReferral';

import { useParams } from 'react-router-dom';

import ClaimInfoToolbar from '../3-middle/ClaimInfoToolbar';
import ClaimDetails from '../3-middle/ClaimDetails';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import { UserContext } from '../contexts/UserContext';
import Skeleton from '@mui/material/Skeleton';
import BillMachine from '../3-middle/BillMachine';
import ApptVerification from '../claim-info/ApptVerification';
import RecordsRequestMiddle from '../3-middle/RecordsRequestMiddle';


export default function MiddleSection() {

    let { id: linkId } = useParams();

    const { billMode, setBillMode, keepBillMode } = useContext(SelectedClaimContext);
    const { navbarTab } = useContext(UserContext);

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    return (
      <>
      {navbarTab !== 3 &&
      <ClaimInfoToolbar />
      }
      <hr />
      {billMode === true ?
      <BillMachine />
      :
      navbarTab === 3 ?
      <RecordsRequestMiddle />
      :
      <ClaimDetails />
      }
      </>
    
    );
}