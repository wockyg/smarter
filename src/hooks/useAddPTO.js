import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddPTO() {

  const queryClient = useQueryClient();

  const addPTO = (values) => api
                              .post('/pto', 
                              { 
                                'userId': `${values.userId}`,
                                'title': `${values.title}`,
                                'start': `${values.start}`,
                                'end': `${values.end}`,
                                'dateApproved': `${values.dateApproved}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries(`pto${values.userId}`);
                                queryClient.invalidateQueries(`pto`);
                                return data;
                              });
    
  return useMutation( (values) => addPTO(values), 
                      {onSuccess: () => {
                      console.log('successfully added pto...');
                      }});

}