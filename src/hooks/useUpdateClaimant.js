import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateClaimant() {

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
        queryClient.invalidateQueries('claimants');
        return data;
      });
  }
    
  return useMutation( (values) => updateClaimant(values), 
                      {onSuccess: () => {
                      console.log('successfully updated claimant...');
                      }});

}