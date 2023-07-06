import {api} from '../index';
import { useQuery } from "react-query";

const getReferralVisits = (referralId) => api
                        .get(`/dptBillingVisitsView/claim/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralVisits(referralId) {

  async function getAllReferralVisits() {
    const data = await getReferralVisits(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralVisits', referralId], getAllReferralVisits, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}