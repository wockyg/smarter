import {api} from '../index';
import { useQuery } from "react-query";

const getReferrals = () => api
                        .get('/referralsView')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferrals() {

  async function getAllReferrals() {
    const data = await getReferrals();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referrals'], getAllReferrals, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}