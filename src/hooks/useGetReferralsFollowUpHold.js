import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsFollowUpHold = () => api
                        .get('/referralsView/followuphold')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsFollowUpHold() {

  async function getAllReferralsFollowUpHold() {
    const data = await getReferralsFollowUpHold();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['followuphold'], getAllReferralsFollowUpHold, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}