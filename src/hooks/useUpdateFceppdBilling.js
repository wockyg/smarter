import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import emailjs from '@emailjs/browser';
import { careCoordinators } from '../lookup-tables/lookup_careCoordinators'

export default function useUpdateFceppdBilling() {

  const queryClient = useQueryClient();

  const updateFceppdBilling = (values) => {
    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'referralId'));
    const newValues = Object.fromEntries(filtered);

    console.log(newValues);
    
    api
    .put(`/fceppdBilling/${values.referralId}`, newValues)
    .then(response => {
      const data = response.data;
      console.log(response);
      queryClient.invalidateQueries('fceppdBilling');
      queryClient.invalidateQueries('referrals');
      return data;
    });
  }
    
  return useMutation( (values) => updateFceppdBilling(values), 
                      {onSuccess: () => {
                        console.log('successfully updated fce/ppd...');
                      }});

}