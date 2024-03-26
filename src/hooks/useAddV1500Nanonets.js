import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddV1500Nanonets() {

  const queryClient = useQueryClient();

  const addV1500 = (values) => {

    api.post('/v1500/upload/smarter/nanonets', values,
        {
          headers:
          {
          'Content-Type': 'multipart/form-data'
          }
        }
        )
        .then(response => {
          if (response.status === 200) {
            console.log("Successfully posted to nanonets");
            console.log(response.data)
            return response.status;
          } 
          
        });}
    
  return useMutation( (values) => addV1500(values), 
                      {onSuccess: () => {
                      console.log('successfully added V1500...');
                      }});

}