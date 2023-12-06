import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useUpdateRRLastWorked() {

  const queryClient = useQueryClient();

  const updateRRLastWorked = (values) => {

    api
      .put(`/timestamps/rrlastworked`, values)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries('rrlastworked');
        return data;
      });
  }
    
  return useMutation( (values) => updateRRLastWorked(values), 
                      {onSuccess: () => {
                      console.log('successfully updated rrlastworked...');
                      }});

}