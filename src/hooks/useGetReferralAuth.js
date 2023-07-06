import {api} from '../index';
import { useQuery } from "react-query";

const getReferralAuth = (referralId) => api
                        .get(`/dptAuthorization/claim/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralAuth(referralId) {

  async function getAllReferralAuth() {
    const data = await getReferralAuth(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralAuth', referralId], getAllReferralAuth, {
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}