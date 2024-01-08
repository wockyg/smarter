import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsRRIA = () => api
                        .get('/referralsView/rria')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsRRIA() {

  async function getAllReferralsRRIA() {
    const data = await getReferralsRRIA();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['rria'], getAllReferralsRRIA, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}