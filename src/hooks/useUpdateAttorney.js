import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateAttorney() {

  const queryClient = useQueryClient();

  const updateAttorney = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'attorneyId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/attorneys/${values.attorneyId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries('attorneys');
        return data;
      });
  }
    
  return useMutation( (values) => updateAttorney(values), 
                      {onSuccess: () => {
                      console.log('successfully updated attorney...');
                      }});

}