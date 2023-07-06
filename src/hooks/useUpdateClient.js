import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateClient() {

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
        queryClient.invalidateQueries('clients');
        return data;
      });
  }
    
  return useMutation( (values) => updateClient(values), 
                      {onSuccess: () => {
                      console.log('successfully updated client...');
                      }});

}