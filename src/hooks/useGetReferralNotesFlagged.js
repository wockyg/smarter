import {api} from '../index';
import { useQuery } from "react-query";

const getReferralNotesFlagged = (referralId) => api
                        .get(`/referralNotes/flagged/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralNotesFlagged(referralId) {

  async function getAllReferralNotesFlagged() {
    const data = await getReferralNotesFlagged(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralNotesFlagged', referralId], getAllReferralNotesFlagged, {
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}