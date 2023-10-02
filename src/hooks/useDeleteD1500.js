import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteD1500() {

  const queryClient = useQueryClient();

  const deleteD1500 = (id) => api
                          .delete(`/d1500/${id}`)
                          .then(response => {
                          const data = response.data;
                          // console.log(data);
                          return data;
                          });

  async function deleteOneD1500(id) {
    const data = await deleteD1500(id);
    console.log('data: ', data);
    queryClient.invalidateQueries('d1500');
    return data;
  }
    
  return useMutation( (id) => deleteOneD1500(id), 
                      {onSuccess: () => {
                        console.log('successfully deleted d1500...');
                      }} );

}