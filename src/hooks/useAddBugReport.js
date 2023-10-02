import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddBugReport() {

  const queryClient = useQueryClient();

  const addBugReport = (values) => api
                              .post('/bugReports', 
                              { 
                                'submittedBy': `${values.submittedBy}`,
                                'title': `${values.title}`,
                                'description': `${values.description}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('bugReports');
                                return data;
                              });
    
  return useMutation( (values) => addBugReport(values), 
                      {onSuccess: () => {
                      console.log('successfully added bugReport...');
                      }});

}