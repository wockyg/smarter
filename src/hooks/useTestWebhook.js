import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import payload from '../lookup-tables/finally_sensible.json';

export default function useTestWebhookSensible() {

  const queryClient = useQueryClient();

  const testWebhookSensible = (values) => api
                              .post('/v1500/webhook/sensible', payload)
                              .then(response => {
                                const data = response.data;
                                // console.log(data);
                                return data;
                              });
    
  return useMutation( (values) => testWebhookSensible(values), 
                      {onSuccess: () => {
                      console.log('successfully posted to Sensible webhook...');
                      }});

}