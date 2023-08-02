import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from '../hooks/useGetReferral';

export default function useUpdateAdjuster() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateAdjuster = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'adjusterId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/adjusters/${values.adjusterId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        if (selectedClaim.adjusterId === values.adjusterId) {
          queryClient.invalidateQueries(`referral${+linkId}`);
        }
        queryClient.invalidateQueries(`adjuster${+values.adjusterId}`);
        queryClient.invalidateQueries('adjustersearchall');
        queryClient.invalidateQueries('adjusters');
        return data;
      });
  }
    
  return useMutation( (values) => updateAdjuster(values), 
                      {onSuccess: () => {
                      console.log('successfully updated adjuster...');
                      }});

}