import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteVisit() {

  const queryClient = useQueryClient();

  const deleteVisit = (id) => api
                          .delete(`/dptBillingVisits/${id}`)
                          .then(response => {
                          const data = response.data;
                          // console.log(data);
                          return data;
                          });

  async function deleteOneVisit(id) {
    const data = await deleteVisit(id);
    console.log('data: ', data);
    queryClient.invalidateQueries('referralVisits');
    return data;
  }
    
  return useMutation( (id) => deleteOneVisit(id), 
                      {onSuccess: () => {
                        console.log('successfully deleted visit...');
                      }} );

}