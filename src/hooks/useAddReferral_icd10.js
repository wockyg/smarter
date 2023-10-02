import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddReferral_icd10() {

  const queryClient = useQueryClient();

  const addReferral_icd10 = (values) => api
                              .post('/referral_icd10', 
                              { 
                                'referralId': `${values.referralId}`,
                                'icd10': `${values.icd10}`,
                                'description': `${values.description}`
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('referral_icd10');
                                return data;
                              });
    
  return useMutation( (values) => addReferral_icd10(values), 
                      {onSuccess: () => {
                        console.log('successfully added referral_icd10...');
                      }});

}