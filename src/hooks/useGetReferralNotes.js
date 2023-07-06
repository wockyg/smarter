import {api} from '../index';
import { useQuery } from "react-query";

const getReferralNotes = (referralId) => api
                        .get(`/referralNotes/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralNotes(referralId) {

  async function getAllReferralNotes() {
    const data = await getReferralNotes(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralNotes', referralId], getAllReferralNotes, {
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}