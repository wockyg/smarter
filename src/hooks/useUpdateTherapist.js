import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateTherapist() {

  const queryClient = useQueryClient();

  const updateTherapist = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'therapistId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/therapists/${values.therapistId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries('therapists');
        queryClient.invalidateQueries('referrals');
        return data;
      });
  }
    
  return useMutation( (values) => updateTherapist(values), 
                      {onSuccess: () => {
                      console.log('successfully updated therapist...');
                      }});

}