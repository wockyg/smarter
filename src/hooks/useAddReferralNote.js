import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddAdjuster() {

  const queryClient = useQueryClient();

  const addReferralNote = (values) => api
                              .post('/referralNotes', 
                              { 
                                'referralId': `${values.referralId}`,
                                'initials': `${values.initials}`,
                                'flag': `${values.flag ? values.flag : null}`,
                                'note': `${values.note}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('referralNotes');
                                return data;
                              });
    
  return useMutation( (values) => addReferralNote(values), 
                      {onSuccess: () => {
                        console.log('successfully added note...');
                      }});

}