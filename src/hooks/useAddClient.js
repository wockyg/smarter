import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddClient() {

  const queryClient = useQueryClient();

  const addClient = (values) => api
                              .post('/clients', 
                              { 
                                'client': `${values.client}`,
                                'billReview': `${values.billReview}`,
                                'phone': `${values.phone}`,
                                'fax': `${values.fax}`,
                                'email': `${values.email}`,
                                'billingProtocol': `${values.billingProtocol}`,
                                'notes': `${values.notes}`,
                                'mailingAddress': `${values.mailingAddress}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('clients');
                                return data;
                              });
    
  return useMutation( (values) => addClient(values), 
                      {onSuccess: () => {
                      console.log('successfully added client...');
                      }});

}