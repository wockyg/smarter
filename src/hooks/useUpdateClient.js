import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from '../hooks/useGetReferral';

export default function useUpdateClient() {

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateClient = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'clientId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/clients/${values.clientId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        if (selectedClaim.adjusterClientId === values.clientId) {
          queryClient.invalidateQueries(`referral${+linkId}`);
        }
        queryClient.invalidateQueries(`client${+values.clientId}`);
        queryClient.invalidateQueries('clients');
        return data;
      });
  }
    
  return useMutation( (values) => updateClient(values), 
                      {onSuccess: () => {
                      console.log('successfully updated client...');
                      }});

}