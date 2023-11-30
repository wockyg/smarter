import {api} from '../index';
import { useQueryClient } from "react-query";
import useSyncMutation from './useSyncMutation';

export default function useUpdatePTO() {

  const queryClient = useQueryClient();

  const updatePTO = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'ptoId'));
    const newValues = Object.fromEntries(filtered);

    console.log("newValues", newValues)

    api
      .put(`/pto/${values.ptoId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries(`pto`);
        return data;
      });
  }
    
  return useSyncMutation( (values) => updatePTO(values), 
                      {onSuccess: () => {
                      console.log('successfully updated pto...');
                      }});

}