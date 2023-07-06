import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdatePhysician() {

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
        queryClient.invalidateQueries('physicians');
        return data;
      });
  }
    
  return useMutation( (values) => updatePhysician(values), 
                      {onSuccess: () => {
                      console.log('successfully updated physician...');
                      }});

}