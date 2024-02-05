import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddCPT() {

  const queryClient = useQueryClient();

  const addCPT = (values) => api
                              .post('/lookup_cpt', 
                              { 
                                'Code': values.Code,
                                'MaxUnit': values.MaxUnit,
                                'State': values.State,
                                'Rate': values.Rate
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries(`lookup_cpt_${values.State}`);
                                return data;
                              });
    
  return useMutation( (values) => addCPT(values), 
                      {onSuccess: () => {
                      console.log('successfully added cpt code...');
                      }});

}