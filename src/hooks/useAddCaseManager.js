import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddCasemanager() {

  const queryClient = useQueryClient();

  const addCasemanager = (values) => api
                              .post('/casemanagers', 
                              { 
                                'firstName': `${values.firstName}`,
                                'lastName': `${values.lastName}`,
                                'clientId': values.clientId,
                                'address': `${values.address}`,
                                'city': `${values.city}`,
                                'state': `${values.state}`,
                                'zip': `${values.zip}`,
                                'phone': `${values.phone}`,
                                'phoneExt': `${values.phoneExt}`,
                                'fax': `${values.fax}`,
                                'email': `${values.email}`,
                                'fceRate': values.fceRate > 0 ? values.fceRate : null,
                                'ppdRate': values.ppdRate > 0 ? values.ppdRate : null,
                                'ppdDiscountRate': values.ppdDiscountRate > 0 ? values.ppdDiscountRate : null,
                                'ptInstructions': `${values.ptInstructions}`,
                                'fceppdInstructions': `${values.fceppdInstructions}`,
                                'billingInstructions': `${values.billingInstrucions}`,
                                'status': `${values.status}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('casemanagers');
                                queryClient.invalidateQueries('casemanagersdropdown');
                                queryClient.invalidateQueries('casemanagersearchall');
                                return data;
                              });
    
  return useMutation( (values) => addCasemanager(values), 
                      {onSuccess: () => {
                      console.log('successfully added casemanager...');
                      }});

}