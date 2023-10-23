import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import emailjs from '@emailjs/browser';

export default function useAddBugReport() {

  const queryClient = useQueryClient();

  const sendEmail = (values) => {
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
                                sendEmail(data);
                                alert("Bug report submitted successfully.");
                                return data;
                              });
    
  return useMutation( (values) => addBugReport(values), 
                      {onSuccess: () => {
                      console.log('successfully added bugReport...');
                      }});

}