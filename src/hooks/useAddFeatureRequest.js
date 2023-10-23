import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import emailjs from '@emailjs/browser';

export default function useAddFeatureRequest() {

  const queryClient = useQueryClient();

  const sendEmail = (values) => {
    console.log(values);
    const params = {
      to_email: `wmcclure@definedpt.com`,
      subject: `New Feature Request - SMARTER`, 
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

  const addFeatureRequest = (values) => api
                              .post('/featureRequests', values,
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
                                queryClient.invalidateQueries('featureRequests');
                                sendEmail(data);
                                alert("Feature Request submitted successfully.");
                                return data;
                              });
    
  return useMutation( (values) => addFeatureRequest(values), 
                      {onSuccess: () => {
                      console.log('successfully added featureRequest...');
                      }});

}