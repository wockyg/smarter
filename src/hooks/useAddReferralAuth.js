import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddReferralAuth() {

  const queryClient = useQueryClient();

  const addReferralAuth = (values) => api
                              .post('/dptAuthorization', 
                              { 
                                'referralId': `${values.referralId}`,
                                'approvedVisits': `${values.approvedVisits}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('referralAuth');
                                queryClient.invalidateQueries('referralVisits');
                                return data;
                              });
    
  return useMutation( (values) => addReferralAuth(values), 
                      {onSuccess: () => {
                        console.log('successfully added auth...');
                      }});

}