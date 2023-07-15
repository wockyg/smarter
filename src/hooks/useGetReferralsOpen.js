import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsOpen = () => api
                        .get('/referralsView/open')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsOpen() {

  async function getAllReferralsOpen() {
    const data = await getReferralsOpen();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralsOpen'], getAllReferralsOpen, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}