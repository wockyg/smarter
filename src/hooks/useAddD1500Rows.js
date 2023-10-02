import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useAddD1500Rows() {

  const queryClient = useQueryClient();

  const addD1500Rows = (values) => api
                              .post('/d1500Rows', 
                              { 
                                'hcfaId': `${values.hcfaId}`,
                                'dos': `${values.dos}`,
                                'pos': `${values.pos}`,
                                'cpt': `${values.cpt}`,
                                'mod1': `${values.mod1}`,
                                'mod2': `${values.mod2}`,
                                'mod3': `${values.mod3}`,
                                'mod4': `${values.mod4}`,
                                'diag': `${values.diag}`,
                                'charges': `${values.charges}`,
                                'units': `${values.units}`,
                                'provider_npi': `${values.provider_npi}`,
                              })
                              .then(response => {
                                const data = response.data;
                                console.log(data);
                                queryClient.invalidateQueries('d1500Rows');
                                return data;
                              });
    
  return useMutation( (values) => addD1500Rows(values), 
                      {onSuccess: () => {
                      console.log('successfully added d1500Row...');
                      }});

}