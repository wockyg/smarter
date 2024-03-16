import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddV1500Sensible() {

  const queryClient = useQueryClient();

  const addV1500 = (values) => {

    // Display the key/value pairs
    // for (const pair of values.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    api.post('/v1500/upload/smarter/sensible', values,
        {
          headers:
          {
          'Content-Type': 'multipart/form-data'
          }
        }
        )
        .then(response => {
          if (response.status === 200) {
            const data = response.data;
            console.log("addRow success", data);
            return data;
          } 
          
        });}
    
  return useMutation( (values) => addV1500(values), 
                      {onSuccess: () => {
                      console.log('successfully added V1500...');
                      }});

}