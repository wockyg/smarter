import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsClaimant = (id) => api
                        .get(`/referralsView/claimant/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsClaimant(id) {

  async function getAllReferralsClaimant() {
    const data = await getReferralsClaimant(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`referral${id}`], getAllReferralsClaimant, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}