import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from '../hooks/useGetReferral';

export default function useUpdatePhysician() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updatePhysician = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'physicianId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/physicians/${values.physicianId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        if (selectedClaim.physicianId === values.physicianId) {
          queryClient.invalidateQueries(`referral${+linkId}`);
        }
        queryClient.invalidateQueries(`physician${+values.physicianId}`);
        queryClient.invalidateQueries('physiciansearchall');
        queryClient.invalidateQueries('physicians');
        return data;
      });
  }
    
  return useMutation( (values) => updatePhysician(values), 
                      {onSuccess: () => {
                      console.log('successfully updated physician...');
                      }});

}