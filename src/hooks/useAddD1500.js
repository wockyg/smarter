import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import useAddD1500Rows from '../hooks/useAddD1500Rows';

export default function useAddD1500() {

  const queryClient = useQueryClient();

  const addD1500 = (values) => api
                              .post('/d1500', 
                              { 
                                'referralId': `${+values.referralId}`,
                                'sendFormat': `${values.sendFormat}`,
                              })
                              .then(response => {
                                if (response.status === 200) {
                                  const data = response.data;
                                  const hcfaId = data.hcfaId;
                                  console.log(data);
                                  // console.log(values);
                                  values.cptRows.forEach((row) => {
                                    console.log("adding cptRow...");
                                    api.post('d1500Rows',
                                    {
                                      'hcfaId': hcfaId,
                                      'dos': row.dos,
                                      'pos': row.pos,
                                      'cpt': row.cpt,
                                      'mod1': row.mod1,
                                      'mod2': row.mod2,
                                      'mod3': row.mod3,
                                      'mod4': row.mod4,
                                      'diag': row.diag,
                                      'charges': row.charges,
                                      'units': row.units,
                                      'provider_npi': row.provider_npi,
                                    }).then(res => {
                                      const data = res.data;
                                      console.log(res.status, data);
                                      if (res.status === 200) {
                                        console.log("addRow success");
                                        queryClient.invalidateQueries(`d1500View_claim_${values.referralId}`);
                                        // queryClient.invalidateQueries('d1500Rows');
                                        // update dptBilling for each DOS (d1500Generated, adjusterRate)
                                      }
                                    })

                                  });
                                  // console.warn("WOW!");
                                  return data;
                                } 
                                
                              });
    
  return useMutation( (values) => addD1500(values), 
                      {onSuccess: () => {
                      console.log('successfully added D1500...');
                      }});

}