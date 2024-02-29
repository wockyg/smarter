import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import payload from '../lookup-tables/finally_sensible.json';

export default function useTestWebhook() {

  const queryClient = useQueryClient();

  const testWebhook = (values) => api
                              .post('/v1500/webhook/sensible', payload)
                              .then(response => {
                                const data = response.data;
                                // console.log(data);
                                return data;
                              });
    
  return useMutation( (values) => testWebhook(values), 
                      {onSuccess: () => {
                      console.log('successfully posted to webhook...');
                      }});

}