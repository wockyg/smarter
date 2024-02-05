import {api} from '../index';
import { useQueryClient } from "react-query";
import useSyncMutation from './useSyncMutation';

export default function useUpdateCPT() {

  const queryClient = useQueryClient();

  const updateCPT = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'OriginalCode'));
    const newValues = Object.fromEntries(filtered);

    console.log("newValues", newValues)

    api
      .put(`/lookup_cpt/code/${values.OriginalCode}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries(`lookup_cpt_${values.State}`);
        return data;
      });
  }
    
  return useSyncMutation( (values) => updateCPT(values), 
                      {onSuccess: () => {
                      console.log('successfully updated cpt...');
                      }});

}