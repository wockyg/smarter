import { useContext } from 'react';

import useGetReferral from '../hooks/useGetReferral';

import { useParams } from 'react-router-dom';

import ClaimInfoToolbar from '../3-middle/ClaimInfoToolbar';
import ClaimDetails from '../3-middle/ClaimDetails';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import Skeleton from '@mui/material/Skeleton';
import BillMachine from '../3-middle/BillMachine';


export default function MiddleSection() {

    let { id: linkId } = useParams();

    const { billMode, setBillMode, keepBillMode } = useContext(SelectedClaimContext);

    const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

    return (
      <>
      <ClaimInfoToolbar />
      <hr />
      {billMode === true ?
      <BillMachine />
      :
      <ClaimDetails />
      }
      </>
    
    );
}