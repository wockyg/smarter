import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateAdjuster() {

  const queryClient = useQueryClient();

  const updateAdjuster = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'adjusterId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/adjusters/${values.adjusterId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries('adjusters');
        return data;
      });
  }
    
  return useMutation( (values) => updateAdjuster(values), 
                      {onSuccess: () => {
                      console.log('successfully updated adjuster...');
                      }});

}