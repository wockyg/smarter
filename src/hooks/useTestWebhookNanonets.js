import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import payload from '../lookup-tables/finally_nanonets.json';

export default function useTestWebhookNanonets() {

  const queryClient = useQueryClient();

  const testWebhookNanonets = (values) => api
                              .post('/v1500/webhook/nanonets', payload)
                              .then(response => {
                                const data = response.data;
                                // console.log(data);
                                return data;
                              });
    
  return useMutation( (values) => testWebhookNanonets(values), 
                      {onSuccess: () => {
                      console.log('successfully posted to Nanonets webhook...');
                      }});

}