import { useContext, useState } from 'react';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddV1500Nanonets() {

  const { v1500UploadProgress, setV1500UploadProgress, billMode } = useContext(SelectedClaimContext);

  const [progress, setProgress] = useState()

  console.log(v1500UploadProgress)

  const queryClient = useQueryClient();

  const addV1500 = async (values) => {

    // console.log(values)

    const result = []

    let files = values.getAll("v1500Blobs")

    console.log(files)

    const newProgress = files.map(f => {
        return {filename: f.name, percentComplete: 0}
    })

    setProgress(newProgress)

    for(let i = 0; i < files.length; i++) {

      const formData = new FormData();
      formData.append("v1500Blobs", files[i]);
      formData.append("userId", values.get("userId"))

      const upload = await api.post(
            '/v1500/upload/smarter/nanonets', 
            formData, 
            {
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress: (p) => {
                  const percentComplete = Math.round((p.loaded * 100) / p.total)
                  const otherFiles = progress.filter(v => v.filename !== files[i].name)
                  // console.log(otherFiles)
                  const newState = [...otherFiles, {filename: files[i].name, percentComplete: percentComplete}]
                  setProgress(newState)
                  setV1500UploadProgress(newState)
                  // console.log(`${files[i].name} - ${percentComplete}% uploaded`)
                }
            }
          )

      result.push(upload)
      
      // console.log(upload)
      console.log(`File ${i} uploaded...`)
    }

    
    // console.log(result)
    return result
      
  }
    
  return useMutation( (values) => addV1500(values), 
                      {onSuccess: () => {
                      console.log('successfully added V1500...');
                      }});

}