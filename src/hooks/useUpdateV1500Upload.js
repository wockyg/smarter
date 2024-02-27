import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateV1500Upload() {

  const queryClient = useQueryClient();

  const updateV1500Upload = (values) => {
    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'v1500Id'));
    const newValues = Object.fromEntries(filtered);

    console.log(newValues);
    
    api
    .put(`/v1500/upload/${values.v1500Id}`, newValues)
    .then(response => {
      const data = response.data;
      console.log(response);
      queryClient.invalidateQueries('v1500NotApproved');
      // queryClient.invalidateQueries('referralsearchall');
      // queryClient.invalidateQueries('referrals');
      return data;
    });
  }
    
  return useMutation( (values) => updateV1500Upload(values), 
                      {onSuccess: () => {
                        console.log('successfully updated v1500...');
                      }});

}