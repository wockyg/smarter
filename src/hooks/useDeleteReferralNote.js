import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteReferralNote() {

  const queryClient = useQueryClient();

  const deleteReferralNote = (noteId) => api
                          .delete(`/referralNotes/${noteId}`)
                          .then(response => {
                          const data = response.data;
                          // console.log(data);
                          return data;
                          });

  async function deleteOneReferralNote(values) {
    const data = await deleteReferralNote(values.noteId);
    console.log('data: ', data);
    queryClient.invalidateQueries('referralNotes');
    return data;
  }
    
  return useMutation( (values) => deleteOneReferralNote(values), 
                      {onSuccess: () => {
                        console.log('successfully deleted note...');
                      }} );

}