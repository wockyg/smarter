import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import emailjs from '@emailjs/browser';
import { careCoordinators } from '../lookup-tables/lookup_careCoordinators'

import useGetReferral from '../hooks/useGetReferral';
import { useParams } from 'react-router-dom';

export default function useUpdateReferral() {

  let { id: linkId } = useParams();
  
  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const sendEmail = () => {
    const path = 'http://localhost:3000';
    const ccEmail = careCoordinators.filter((el) => el.Initials === selectedClaim.assign)[0].email;
    console.log(ccEmail);
    const params = {
      to_email: `${ccEmail}`, 
      subject: `Missed IA - ${selectedClaim.claimant} - DOS ${selectedClaim.apptDate}`, 
      message: `Click <a href="${path}/${selectedClaim.referralId}">here</a> to view in smart.`
    }
    emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, '0mive5-lH56wNnNf7')
    .then((res) => {
        console.log(res.status, res.text);
        console.log(params);
    }, (err) => {
        console.log(err.text);
    });
  };

  const updateReferral = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'referralId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/referrals/${values.referralId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        if (response.status === 200 && values.confirmAttend && values.confirmAttend === 'No'){
          // send email
          sendEmail();
        }
        queryClient.invalidateQueries(`referral${+linkId}`);
        queryClient.invalidateQueries('referralsOpen');
        queryClient.invalidateQueries('referralsearchall');
        return data;
      });
  }
    
  return useMutation( (values) => updateReferral(values), 
                      {onSuccess: () => {
                      console.log('successfully updated referral...');
                      }});

}