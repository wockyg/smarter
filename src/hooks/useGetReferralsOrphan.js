import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsOrphan = () => api
                        .get('/referralsView/orphan')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsOrphan() {

  async function getAllReferralsOrphan() {
    const data = await getReferralsOrphan();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['orphan'], getAllReferralsOrphan, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}