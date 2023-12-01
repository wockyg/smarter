import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsFollowUpHoldDashboard = (initials) => api
                        .get(`/referralsView/dashboard/followuphold/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsOpenDashboard(initials) {

  async function getAllReferralsFollowUpHoldDashboard() {
    const data = await getReferralsFollowUpHoldDashboard(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['followupholdDashboard'], getAllReferralsFollowUpHoldDashboard, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}