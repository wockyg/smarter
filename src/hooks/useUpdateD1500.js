import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateD1500() {

  const queryClient = useQueryClient();

  const updateD1500 = (values) => {
    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'hcfaId'));
    const newValues = Object.fromEntries(filtered);

    console.log(newValues);
    
    api
    .put(`/d1500/${values.hcfaId}`, newValues)
    .then(response => {
      const data = response.data;
      console.log(response);
      queryClient.invalidateQueries('d1500');
      // queryClient.invalidateQueries('referralsearchall');
      // queryClient.invalidateQueries('referrals');
      return data;
    });
  }
    
  return useMutation( (values) => updateD1500(values), 
                      {onSuccess: () => {
                        console.log('successfully updated d1500...');
                      }});

}