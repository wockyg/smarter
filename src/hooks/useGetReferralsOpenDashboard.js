import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsOpenDashboard = (initials) => api
                        .get(`/referralsView/dashboard/open/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsOpenDashboard(initials) {

  async function getAllReferralsOpenDashboard() {
    const data = await getReferralsOpenDashboard(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['openDashboard'], getAllReferralsOpenDashboard, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}