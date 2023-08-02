import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from '../hooks/useGetReferral';

export default function useUpdateAttorney() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateAttorney = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'attorneyId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/attorneys/${values.attorneyId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        if (selectedClaim.plaintiffAttorneyId === values.attorneyId || selectedClaim.defenseAttorneyId === values.attorneyId) {
          queryClient.invalidateQueries(`referral${+linkId}`);
        }
        queryClient.invalidateQueries(`attorney${+values.attorneyId}`);
        queryClient.invalidateQueries('attorneysearchall');
        queryClient.invalidateQueries('attorneys');
        return data;
      });
  }
    
  return useMutation( (values) => updateAttorney(values), 
                      {onSuccess: () => {
                      console.log('successfully updated attorney...');
                      }});

}