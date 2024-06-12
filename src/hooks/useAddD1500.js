import { useContext } from 'react';
import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

import { SelectedClaimContext } from '../contexts/SelectedClaimContext';

export default function useAddD1500() {

  const { setCptRows, setSelectedV1500, setD1500SendFormat, setPendingD1500Id, setPendingD1500Upload, split  } = useContext(SelectedClaimContext);

  const queryClient = useQueryClient();

  const addD1500 = (values) => {

    // Display the key/value pairs
    // for (const pair of values.entries()) {
    //   console.log(pair[0], pair[1]);
    // }

    const referralId = values.get("referralId")

    setPendingD1500Upload(true)

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
            setPendingD1500Id(response.data?.hcfaId)
            setPendingD1500Upload(false)
            queryClient.invalidateQueries(`D1500RowsView_claim_${referralId}`);
            !split && setCptRows([]);
            !split && setSelectedV1500([]);
            !split && setD1500SendFormat('');
            
            return response.data;
          }
          else {
            // TODO upload failed
          }
          
        });}
    
  return useMutation( (values) => addD1500(values), 
                      {onSuccess: () => {
                      console.log('successfully submitted D1500 for processing...');
                      }});

}