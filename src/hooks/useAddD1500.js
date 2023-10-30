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
                                'dateApproved': `${new Date().toISOString()}`,
                                'physician_name': values.physician_name,
                                'physician_npi': values.physician_npi,
                                'patient_account_no': values.patient_account_no,
                                'diagnosis_a': values.diagnosis_a,
                                'diagnosis_b': values.diagnosis_b,
                                'diagnosis_c': values.diagnosis_c,
                                'diagnosis_d': values.diagnosis_d,
                                'diagnosis_e': values.diagnosis_e,
                                'diagnosis_f': values.diagnosis_f,
                                'diagnosis_g': values.diagnosis_g,
                                'diagnosis_h': values.diagnosis_h,
                                'diagnosis_i': values.diagnosis_i,
                                'diagnosis_j': values.diagnosis_j,
                                'diagnosis_k': values.diagnosis_k,
                                'diagnosis_l': values.diagnosis_l,
                                'v1500Id': values.v1500Id
                              })
                              .then(response => {
                                if (response.status === 200) {
                                  const data = response.data;
                                  const hcfaId = data.hcfaId;
                                  console.log("DATA:", data);
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
                                        queryClient.invalidateQueries(`D1500RowsView_claim_${values.referralId}`);
                                        console.log(`d1500RowsView_claim_${values.referralId}`);
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