import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateCasemanager() {

  const queryClient = useQueryClient();

  const updateCasemanager = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'casemanagerId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/casemanagers/${values.casemanagerId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries('casemanagers');
        return data;
      });
  }
    
  return useMutation( (values) => updateCasemanager(values), 
                      {onSuccess: () => {
                      console.log('successfully updated casemanager...');
                      }});

}