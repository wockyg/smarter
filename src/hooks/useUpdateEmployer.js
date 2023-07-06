import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateEmployer() {

  const queryClient = useQueryClient();

  const updateEmployer = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'employerId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/employers/${values.employerId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries('employers');
        return data;
      });
  }
    
  return useMutation( (values) => updateEmployer(values), 
                      {onSuccess: () => {
                      console.log('successfully updated employer...');
                      }});

}