import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddAdjuster() {

  const queryClient = useQueryClient();

  const addAttorney = (values) => api
                              .post('/attorneys', 
                              { 
                                'firstName': `${values.firstName}`,
                                'lastName': `${values.lastName}`,
                                'firm': `${values.firm}`,
                                'address': `${values.address}`,
                                'city': `${values.city}`,
                                'state': `${values.state}`,
                                'zip': `${values.zip}`,
                                'phone': `${values.phone}`,
                                'fax': `${values.fax}`,
                                'email': `${values.email}`,
                                'email2': `${values.email2}`,
                                'type': `${values.type}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('attorneys');
                                queryClient.invalidateQueries('attorneysdropdown');
                                queryClient.invalidateQueries('attorneysearchall');
                                return data;
                              });
    
  return useMutation( (values) => addAttorney(values), 
                      {onSuccess: () => {
                      console.log('successfully added attorney...');
                      }});

}