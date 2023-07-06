import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddClaimant() {

  const queryClient = useQueryClient();

  const addClaimant = (values) => api
                              .post('/claimants', 
                              { 
                                'firstName': `${values.firstName}`,
                                'lastName': `${values.lastName}`,
                                'employerId': values.employerId > 0 ? values.employerId : null,
                                'gender': `${values.gender}`,
                                'birthDate': `${values.birthDate}`,
                                'injuryDate1': `${values.injuryDate1}`,
                                'injuryDate2': `${values.injuryDate2}`,
                                'address': `${values.address}`,
                                'city': `${values.city}`,
                                'state': `${values.state}`,
                                'zip': `${values.zip}`,
                                'phone': `${values.phone}`,
                                'alternatePhone': `${values.alternatePhone}`,
                                'email': `${values.email}`,
                                'email2': `${values.email2}`,
                                'dateAdded': `${values.dateAdded}`,
                                'notes': `${values.notes}`,
                              })
                              .then(response => {
                                const data = response.data;
                                // console.log(data);
                                queryClient.invalidateQueries('claimants');
                                return data;
                              });
    
  return useMutation( (values) => addClaimant(values), 
                      {onSuccess: () => {
                      console.log('successfully added claimant...');
                      }});

}