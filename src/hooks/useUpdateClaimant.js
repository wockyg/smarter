import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from './useGetReferral';

export default function useUpdateClaimant() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateClaimant = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'claimantId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/claimants/${values.claimantId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        if (selectedClaim.claimantId === values.claimantId) {
          queryClient.invalidateQueries(`referral${+linkId}`);
        }
        queryClient.invalidateQueries(`claimant${+values.claimantId}`);
        queryClient.invalidateQueries('claimantsearchall');
        queryClient.invalidateQueries('claimants');
        return data;
      });
  }
    
  return useMutation( (values) => updateClaimant(values), 
                      {onSuccess: () => {
                      console.log('successfully updated claimant...');
                      }});

}