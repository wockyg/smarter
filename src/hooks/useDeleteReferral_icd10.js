import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteReferral_icd10() {

  const queryClient = useQueryClient();

  const deleteReferral_icd10 = (values) => api
                          .delete(`/referral_icd10`, 
                          {
                            'referralId': `${values.referralId}`,
                            'icd10': `${values.icd10}`,
                          })
                          .then(response => {
                          const data = response.data;
                          console.log(data);
                          return data;
                          });

  async function deleteOneReferral_icd10(values) {
    // console.log("values:", values);
    const data = await deleteReferral_icd10(values);
    // console.log('data: ', data);
    queryClient.invalidateQueries('referral_icd10');
    return data;
  }
    
  return useMutation( (values) => deleteOneReferral_icd10(values), 
                      {onSuccess: () => {
                        console.log('successfully deleted referral_icd10...');
                      }} );

}