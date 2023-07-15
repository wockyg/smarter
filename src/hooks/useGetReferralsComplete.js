import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsComplete = () => api
                        .get('/referralsView/complete')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsComplete() {

  async function getAllReferralsComplete() {
    const data = await getReferralsComplete();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralsComplete'], getAllReferralsComplete, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}