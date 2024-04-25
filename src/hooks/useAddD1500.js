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
            console.log(response.data)
            console.log(referralId)
            queryClient.invalidateQueries(`D1500RowsView_claim_${referralId}`);
            return response.data;
          }
          // if (response.status === 200) {
          //   const data = response.data;
          //   const hcfaId = data.hcfaId;
          //   const cptRowsStr = values.get('cptRows');
          //   const referralId = values.get('referralId');
          //   const cptRows = JSON.parse(cptRowsStr);
          //   // console.log("DATA:", data);
          //   console.log("cptRows:", cptRows);
          //   cptRows.forEach((row) => {
          //     console.log("adding cptRow...");
          //     api.post('d1500Rows',
          //     {
          //       'hcfaId': hcfaId,
          //       'dos': row.dos,
          //       'pos': row.pos,
          //       'cpt': row.cpt,
          //       'mod1': row.mod1,
          //       'mod2': row.mod2,
          //       'mod3': row.mod3,
          //       'mod4': row.mod4,
          //       'diag': row.diag,
          //       'charges': row.charges,
          //       'units': row.units,
          //       'provider_npi': row.provider_npi,
          //     }).then(res => {
          //       const data = res.data;
          //       console.log(res.status, data);
          //       if (res.status === 200) {
          //         console.log("addRow success");
          //         queryClient.invalidateQueries(`D1500RowsView_claim_${referralId}`);
          //         // queryClient.invalidateQueries('d1500Rows');
          //         // update dptBilling for each DOS (d1500Generated, adjusterRate)
          //       }
          //     })

          //   });
          //   // console.warn("WOW!");
          //   return data;
          // } 
          
        });}
    
  return useMutation( (values) => addD1500(values), 
                      {onSuccess: () => {
                      console.log('successfully submitted D1500 for processing...');
                      }});

}