import { useContext } from 'react';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddV1500Nanonets() {

  const { v1500UploadProgress, setV1500UploadProgress } = useContext(SelectedClaimContext);

  const queryClient = useQueryClient();

  const addV1500 = async (values) => {

    // console.log(values)

    let files = values.getAll("v1500Blobs")

    // console.log(files)

    const promises = files.map(async file => {

      const formData = new FormData();
      formData.append("v1500Blobs", file);
      formData.append("userId", values.get("userId"))

      const upload = await new Promise((resolve, reject) => {
        api.post(
            '/v1500/upload/smarter/nanonets', 
            formData, 
            {
              headers: {'Content-Type': 'multipart/form-data'},
              onUploadProgress: (p) => {
                  const percentComplete = Math.round((p.loaded * 100) / p.total)
                  const otherFiles = v1500UploadProgress.filter(v => v.filename !== file.name)
                  setV1500UploadProgress([...otherFiles, {filename: file.name, percentComplete: percentComplete}])
                  console.log(`${file.name} - ${percentComplete}% uploaded`)
                }
            }
          ).then(result => resolve(result))
      })

      console.log("randomLog.........")
      
      return upload

    })

    const result = await Promise.all(promises)
    
    return result
      
  }
    
  return useMutation( (values) => addV1500(values), 
                      {onSuccess: () => {
                      console.log('successfully added V1500...');
                      }});

}