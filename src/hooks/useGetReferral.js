import {api} from '../index';
import { useQuery } from "react-query";

const getReferral = (id) => api
                        .get(`/referralsView/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferral() {

  async function getOneReferral() {
    const data = await getReferral();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referral'], getOneReferral, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}