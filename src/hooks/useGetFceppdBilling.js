import {api} from '../index';
import { useQuery } from "react-query";

const getFceppdBilling = (referralId) => api
                        .get(`/fceppdBillingView/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetFceppdBilling(referralId) {

  async function getFceppdBillingById() {
    const data = await getFceppdBilling(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['fceppdBilling', referralId], getFceppdBillingById, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}