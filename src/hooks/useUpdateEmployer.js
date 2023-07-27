import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from '../hooks/useGetReferral';

export default function useUpdateEmployer() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateEmployer = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'employerId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/employers/${values.employerId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        if (selectedClaim.claimantEmployerId === values.employerId) {
          queryClient.invalidateQueries(`referral${+linkId}`);
        }
        queryClient.invalidateQueries(`employer${+values.physicianId}`);
        queryClient.invalidateQueries('employers');
        return data;
      });
  }
    
  return useMutation( (values) => updateEmployer(values), 
                      {onSuccess: () => {
                      console.log('successfully updated employer...');
                      }});

}