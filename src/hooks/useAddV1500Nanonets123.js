import { useContext } from 'react';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddV1500Nanonets() {

  const { v1500UploadProgress, setV1500UploadProgress } = useContext(SelectedClaimContext);

  const queryClient = useQueryClient();

  const addV1500 = (values) => {

    api.post('/v1500/upload/smarter/nanonets', values,
          {
            headers:
            {
            'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (p) => {
              const percentComplete = Math.round((p.loaded * 100) / p.total)
              setV1500UploadProgress(percentComplete)
              console.log(`${percentComplete}% uploaded`)
            }
          }
          )
          .then(response => {
            // const temp = v1500UploadProgress.filter(p => p.filename !== file.name)
            // setV1500UploadProgress(temp)
            if (response.status === 200) {
              console.log("Successfully posted to nanonets");
              console.log(response.data)
              return response.status;
            } 
            
          });

      
  }
    
  return useMutation( (values) => addV1500(values), 
                      {onSuccess: () => {
                      console.log('successfully added V1500...');
                      }});

}