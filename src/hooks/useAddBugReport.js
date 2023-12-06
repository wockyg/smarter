import { useContext } from 'react';
import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import emailjs from '@emailjs/browser';

import { UserContext } from '../contexts/UserContext';

export default function useAddBugReport() {

  const queryClient = useQueryClient();

  const { user } = useContext(UserContext);

  const sendEmailWM = (values) => {
    console.log(values);
    const params = {
      to_email: `wmcclure@definedpt.com`,
      subject: `New Bug Report - SMARTER`, 
      message: `<u>Submitted By:</u> ${values.submittedBy}<br /><br /><u>Title:</u><br />${values.title}<br /><br /><u>Description:</u><br />${values.description}<br /><br /><u>Screenshot:</u><br />${values.screenshot || ''}`
    }
    emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, '0mive5-lH56wNnNf7')
    .then((res) => {
        console.log(res.status, res.text);
        console.log("Email log", params);
    }, (err) => {
        console.log(err.text);
    });
  };

  const sendEmailConfirmation = (values) => {
    console.log(values);
    const params = {
      to_email: user.email,
      // to_email: `wmcclure@definedpt.com`,
      subject: `Confirmation - New Big Report Submission`, 
      message: `Thank you for you submission. You will receive another notification as soon as an update is available regrding the bug.<br /><br /><u>Title:</u><br />${values.title}<br /><br /><u>Description:</u><br />${values.description}<br /><br /><u>Screenshot:</u><br />${values.screenshot || ''}`
    }
    emailjs.send('service_zl67u0w', 'template_a7ve3kt', params, '0mive5-lH56wNnNf7')
    .then((res) => {
        console.log(res.status, res.text);
        console.log("Email log", params);
    }, (err) => {
        console.log(err.text);
    });
  };

  const addBugReport = (values) => api
                              .post('/bugReports', values,
                              {
                                headers:
                                {
                                'Content-Type': 'multipart/form-data'
                                }
                              }
                              )
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('bugReports');
                                sendEmailWM(data);
                                sendEmailConfirmation(data);
                                alert("Bug report submitted successfully.");
                                return data;
                              });
    
  return useMutation( (values) => addBugReport(values), 
                      {onSuccess: () => {
                      console.log('successfully added bugReport...');
                      }});

}