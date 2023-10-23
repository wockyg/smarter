import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddEmployer() {

  const queryClient = useQueryClient();

  const addEmployer = (values) => api
                              .post('/employers', 
                              { 
                                'name': `${values.name}`,
                                'address': `${values.address}`,
                                'city': `${values.city}`,
                                'state': `${values.state}`,
                                'zip': `${values.zip}`,
                                'phone': `${values.phone}`,
                                'phoneExt': `${values.phoneExt}`,
                                'phone2': `${values.phone2}`,
                                'phone2Ext': `${values.phone2Ext}`,
                                'fax': `${values.fax}`,
                                'email': `${values.email}`,
                                'notes': `${values.notes}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(response);
                                queryClient.invalidateQueries('employers');
                                queryClient.invalidateQueries('employersdropdown');
                                queryClient.invalidateQueries('employersearchall');
                                return data;
                              });
    
  return useMutation( (values) => addEmployer(values), 
                      {onSuccess: () => {
                      console.log('successfully added employer...');
                      }});

}