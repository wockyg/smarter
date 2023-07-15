import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsApptToday = () => api
                        .get('/referralsView/today')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsApptToday() {

  async function getAllReferralsApptToday() {
    const data = await getReferralsApptToday();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['today'], getAllReferralsApptToday, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}