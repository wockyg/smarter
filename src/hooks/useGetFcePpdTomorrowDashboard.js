import {api} from '../index';
import { useQuery } from "react-query";

const getFcePpdTomorrowDashboard = (initials) => api
                        .get(`/referralsView/dashboard/tomorrow/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetFcePpdTomorrowDashboard(initials) {

  async function getAllFcePpdTomorrowDashboard() {
    const data = await getFcePpdTomorrowDashboard(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['tomorrowCC'], getAllFcePpdTomorrowDashboard, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}