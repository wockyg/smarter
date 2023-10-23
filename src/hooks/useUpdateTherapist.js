import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from './useGetReferral';

export default function useUpdateTherapist() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateTherapist = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'therapistId'));
    let newValues = Object.fromEntries(filtered);
    
    // if(values.dpt.length > 0) {
    //   newValues.dpt = values.dpt[0];
    // }
    // else {
    //   newValues.dpt = '';
    // }

    api
      .put(`/therapists/${values.therapistId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log({...newValues, therapistId: values.therapistId});
        if (selectedClaim.therapistId === values.therapistId) {
          queryClient.invalidateQueries(`referral${+linkId}`);
        }
        queryClient.invalidateQueries(`therapist${+values.therapistId}`);
        queryClient.invalidateQueries('therapists');
        queryClient.invalidateQueries('therapistsearchall');
        queryClient.invalidateQueries('referralsearchall');
        queryClient.invalidateQueries('referrals');
        return data;
      });
  }
    
  return useMutation( (values) => updateTherapist(values), 
                      {onSuccess: () => {
                      console.log('successfully updated therapist...');
                      }});

}