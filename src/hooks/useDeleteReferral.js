import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";

export default function useDeleteReferral() {

  const queryClient = useQueryClient();

  const deleteReferral = (referralId) => api
                          .delete(`/referrals/${referralId}`)
                          .then(response => {
                          const data = response.data;
                          // console.log(data);
                          return data;
                          });

  async function deleteOneReferral(id) {
    const data = await deleteReferral(id);
    console.log('data: ', data);
    queryClient.invalidateQueries('referrals');
    queryClient.invalidateQueries('referralsOpen');
    queryClient.invalidateQueries('openDashboard');
    queryClient.invalidateQueries('referralsView');
    queryClient.invalidateQueries('referralscalendar');
    queryClient.invalidateQueries('referralsearch');
    queryClient.invalidateQueries('referralsearchall');
    queryClient.invalidateQueries('trackedFiles');
    queryClient.invalidateQueries('trackedFilescc');
    return data;
  }
    
  return useMutation( (id) => deleteOneReferral(id), 
                      {onSuccess: () => {
                        console.log('successfully deleted referral...');
                      }} );

}