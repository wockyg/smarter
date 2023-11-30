import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useDeletePTO() {

  const queryClient = useQueryClient();

  const deletePTO = (id) => api
                          .delete(`/pto/${id}`)
                          .then(response => {
                          const data = response.data;
                          // console.log(data);
                          return data;
                          });

  async function deleteOnePTO(id) {
    const data = await deletePTO(id);
    console.log('data: ', data);
    queryClient.invalidateQueries('pto');
    return data;
  }
    
  return useMutation( (id) => deleteOnePTO(id), 
                      {onSuccess: () => {
                        console.log('successfully deleted pto...');
                      }} );

}