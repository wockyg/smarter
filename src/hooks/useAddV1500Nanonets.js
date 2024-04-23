import { useContext } from 'react';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddV1500Nanonets() {

  const { v1500UploadProgress, setV1500UploadProgress } = useContext(SelectedClaimContext);

  const queryClient = useQueryClient();

  const addV1500 = (values) => {

    // console.log(values)

    let files = values.getAll("v1500Blobs")

    // console.log(files)

    return Promise.all(

      files.map(async (file, index) => {

        const formData = new FormData();
        formData.append("v1500Blobs", file);
        formData.append("userId", values.get("userId"))

        return await api.post(
            '/v1500/upload/smarter/nanonets', 
            formData, 
            {
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress: (p) => {
                  const percentComplete = Math.round((p.loaded * 100) / p.total)
                  setV1500UploadProgress({filename: file.name, percentComplete: percentComplete})
                  console.log(`${percentComplete}% uploaded`)
                }
            }
          )
      })
    )
      
  }
    
  return useMutation( (values) => addV1500(values), 
                      {onSuccess: () => {
                      console.log('successfully added V1500...');
                      }});

}