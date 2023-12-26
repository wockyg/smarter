import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsActive = () => api
                        .get('/referralsView/active')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsActive() {

  async function getAllReferralsActive() {
    const data = await getReferralsActive();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['active'], getAllReferralsActive, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}