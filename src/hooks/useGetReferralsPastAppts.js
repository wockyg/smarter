import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsPastAppts = () => api
                        .get('/referralsView/pastAppts')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsPastAppts() {

  async function getAllReferralsPastAppts() {
    const data = await getReferralsPastAppts();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['pastAppts'], getAllReferralsPastAppts, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}