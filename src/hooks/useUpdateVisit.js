import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import emailjs from '@emailjs/browser';
import { careCoordinators } from '../lookup-tables/lookup_careCoordinators';
import useGetReferral from './useGetReferral';
import { useParams } from 'react-router-dom';

export default function useUpdateVisit() {

  let { id: linkId } = useParams();
  
  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const sendEmail = (values, type) => {
    const path = 'https://smarter-one.vercel.app';
    const ccEmail = careCoordinators.filter((el) => el.Initials === values.assign)[0].email;
    console.log(ccEmail);
    console.log(values);
    const params = {
      to_email: `${ccEmail}`,
      subject: type === "missed" ? `Missed Appt - ${values.claimant}` : `24 visits reached - ${values.claimant}`, 
      message: `Click <a href="${path}/${values.referralId}">here</a> to view in smart.`
    }
    emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, '0mive5-lH56wNnNf7')
    .then((res) => {
        console.log(res.status, res.text);
        console.log("Email log", params);
    }, (err) => {
        console.log(err.text);
    });
  };

  const updateVisit = (values) => {
    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'referralId' && key !== 'assign'));
    const newValues = Object.fromEntries(filtered);
    const nullValues = {
      'serviceType': null,
      'notesReceived': null,
      'v1500': null,
      'd1500Sent': null,
      'dosNotes': null,
      'needPN': null,
      'd1500SendFormat': null,
      'adjusterRate': null,
      'paymentStatus': null,
      'paymentStatusDate': null,
      'dateRebilled': null,
      'rebillFormat': null,
      'adjusterDatePaid': null,
      'adjusterAmountPaid': null,
      'facilityRate': null,
      'facilityDatePaid': null,
      'facilityAmountPaid': null,
      'checkNumber': null,
      'writeOff': null,
    }
    
    api
    .put(`/dptBillingVisits/${values.billingId}`, values.attend === "No" ? {...newValues, ...nullValues} : newValues)
    .then(response => {
      const data = response.data;
      console.log("Update log", response);
      if (response.status === 200 && values.attend && values.attend === 'No'){
        api.post('/dptBillingVisits',
        {
          'referralId': `${values.referralId}`,
        }).then(res => {
          const newVisit = res.data;
          console.log("Post log", newVisit);
          if (res.status === 200) {
            // send email
            sendEmail(selectedClaim, "missed");
          }
        })
      }
      else if (response.status === 200 && values.attend && values.attend === 'Yes'){
        api.get(`/dptBillingVisitsView/claim/${values.referralId}`)
           .then(res => {
              const visits = res.data;
              console.log(visits);
              if (res.status === 200 && visits.length > 0) {
                // alert("visits retrieved");
                const attended = visits.filter((v) => v.attend === "Yes").length;
                alert(attended);
                if (attended >= 24 && !selectedClaim.odgLimitEmailSent) {
                  // send email
                  sendEmail(selectedClaim, "odg");
                  api
                  .put(`/referrals/${values.referralId}`, {odgLimitEmailSent: new Date()})
                  .then(res => console.log(res))
                }
              }
            })
      }
      queryClient.invalidateQueries('referralVisits');
      queryClient.invalidateQueries('referralsearchall');
      queryClient.invalidateQueries('referrals');
      queryClient.invalidateQueries('missingV1500');
      queryClient.invalidateQueries('d1500NotSent');
      queryClient.invalidateQueries('adjusterPastDue');
      queryClient.invalidateQueries('facilityPastDue');
      return data;
    });
  }
    
  return useMutation( (values) => updateVisit(values), 
                      {onSuccess: () => {
                      console.log('successfully updated visit...');
                      }});

}