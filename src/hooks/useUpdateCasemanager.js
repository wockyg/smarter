import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from './useGetReferral';

export default function useUpdateCasemanager() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateCasemanager = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'casemanagerId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/casemanagers/${values.casemanagerId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        if (selectedClaim.casemanagerId === values.casemanagerId || selectedClaim.casemanager2Id === values.casemanagerId) {
          queryClient.invalidateQueries(`referral${+linkId}`);
        }
        queryClient.invalidateQueries(`casemanager${+values.casemanagerId}`);
        queryClient.invalidateQueries('casemanagersearchall');
        queryClient.invalidateQueries('casemanagers');
        return data;
      });
  }
    
  return useMutation( (values) => updateCasemanager(values), 
                      {onSuccess: () => {
                      console.log('successfully updated casemanager...');
                      }});

}