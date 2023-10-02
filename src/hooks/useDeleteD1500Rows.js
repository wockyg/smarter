import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteD1500Rows() {

  const queryClient = useQueryClient();

  const deleteD1500Rows = (id) => api
                          .delete(`/d1500Rows/${id}`)
                          .then(response => {
                          const data = response.data;
                          // console.log(data);
                          return data;
                          });

  async function deleteOneD1500Row(id) {
    const data = await deleteD1500Rows(id);
    console.log('data: ', data);
    queryClient.invalidateQueries('d1500Rows');
    return data;
  }
    
  return useMutation( (id) => deleteOneD1500Row(id), 
                      {onSuccess: () => {
                        console.log('successfully deleted d1500Row...');
                      }} );

}