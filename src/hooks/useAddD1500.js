import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import useAddD1500Rows from '../hooks/useAddD1500Rows';

export default function useAddD1500() {

  const queryClient = useQueryClient();

  const addD1500 = (values) => {

    // Display the key/value pairs
    // for (const pair of values.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    const referralId = values.get("referralId")

    api.post('/d1500', values,
        {
          headers:
          {
          'Content-Type': 'multipart/form-data'
          }
        }
        )
        .then(response => {
          if (response.status === 200) {
            console.log("Successfully posted d1500 to db...");
            // console.log(response.data)
            queryClient.invalidateQueries(`D1500RowsView_claim_${referralId}`);
            return response.data;
          }
          
        });}
    
  return useMutation( (values) => addD1500(values), 
                      {onSuccess: () => {
                      console.log('successfully submitted D1500 for processing...');
                      }});

}