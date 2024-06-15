import { useContext, useState } from 'react';
import { SelectedClaimContext } from '../contexts/SelectedClaimContext';
import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddV1500Nanonets() {

  const { uploadedFiles, setUploadedFiles, v1500UploadProgress, setV1500UploadProgress, v1500UploadComplete, setV1500UploadComplete, v1500UploadFail, setV1500UploadFail } = useContext(SelectedClaimContext);

  // const [progress, setProgress] = useState([])

  // console.log(v1500UploadProgress)

  const queryClient = useQueryClient();

  const addV1500 = async (values) => {

    // console.log(progress)

    const result = []

    let files = values.getAll("v1500Blobs")

    console.log(files)

    const complete = []
    const fail = []

    // files.map(f => {
    //     return {filename: f.name, percentComplete: 0}
    // })

    // setProgress(newProgress)

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
                  // const otherFiles = newProgress.filter(v => v.filename !== files[i].name)
                  // console.log(otherFiles)
                  const newState = {filename: files[i].name, percentComplete: percentComplete}
                  setV1500UploadProgress(newState)
                  // console.log(`${files[i].name} - ${percentComplete}% uploaded`)
                }
            }
          )

      if (upload.status === 200) {
        complete.push(files[i].name)
        setV1500UploadComplete(complete)
        // v1500UploadComplete.length > 0
        // console.log("uploadedFiles", uploadedFiles)
        // console.log("files[i.name]", files[i.name])
        const newFiles = uploadedFiles.filter(u => u.name !== files[i].name)
        setUploadedFiles(newFiles)
        console.log(`File ${i} uploaded...`)
        console.log("newFiles", newFiles)
        // console.log("files.length", files.length)
        if (i+1 === files.length) {
          console.log("final file, resetting state...")
          setUploadedFiles([])
          setV1500UploadProgress({})
          setV1500UploadComplete([])
          setV1500UploadFail([])
        }
      }
      else {
        // try again
        console.log("try again...")
        const upload2 = await api.post(
              '/v1500/upload/smarter/nanonets', 
              formData, 
              {
                headers: {'Content-Type': 'multipart/form-data'},
                onUploadProgress: (p) => {
                    const percentComplete = Math.round((p.loaded * 100) / p.total)
                    // const otherFiles = newProgress.filter(v => v.filename !== files[i].name)
                    // console.log(otherFiles)
                    const newState = {filename: files[i].name, percentComplete: percentComplete}
                    setV1500UploadProgress(newState)
                    // console.log(`${files[i].name} - ${percentComplete}% uploaded`)
                  }
              }
            )

        if (upload2.status === 200) {
          console.log(`File ${i} uploaded...`)
          complete.push(files[i].name)
          setV1500UploadComplete(complete)
          // console.log("files.length", files.length)
          if (i+1 === files.length) {
            console.log("final file, resetting state...")
            setUploadedFiles([])
            setV1500UploadProgress({})
            setV1500UploadComplete([])
            setV1500UploadFail([])
          }
          else {
            console.log("is anybody there????")
            const newFiles = uploadedFiles.filter(u => u.name !== files[i].name)
            console.log("uploadedFiles", uploadedFiles)
            console.log("newFiles", newFiles)
            setUploadedFiles(newFiles)
          }
        }
        else {
          fail.push(files[i].name)
          setV1500UploadFail(fail)
          console.log(`File ${i} failed...`)
        }

      }


      result.push(upload)

      // console.log(upload)
    }

    
    // console.log(result)
    return result
      
  }
    
  return useMutation( (values) => addV1500(values), 
                      {onSuccess: () => {
                      console.log('successfully added V1500...');
                      }});

}