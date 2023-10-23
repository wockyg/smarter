import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddPhysician() {

  const queryClient = useQueryClient();

  const addPhysician = (values) => api
                              .post('/physicians', 
                              { 
                                'firstName': `${values.firstName}`,
                                'lastName': `${values.lastName}`,
                                'titles': `${values.titles}`,
                                'facility': `${values.facility}`,
                                'address': `${values.address}`,
                                'city': `${values.city}`,
                                'state': `${values.state}`,
                                'zip': `${values.zip}`,
                                'phone': `${values.phone}`,
                                'phoneExt': `${values.phoneExt}`,
                                'fax': `${values.fax}`,
                                'email': `${values.email}`,
                                'email2': `${values.email2}`,
                                'notes': `${values.notes}`,
                                'npi': values.npi > 0 ? values.npi : null,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('physicians');
                                queryClient.invalidateQueries('physiciansdropdown');
                                queryClient.invalidateQueries('physiciansearchall');
                                return data;
                              });
    
  return useMutation( (values) => addPhysician(values), 
                      {onSuccess: () => {
                      console.log('successfully added physician...');
                      }});

}