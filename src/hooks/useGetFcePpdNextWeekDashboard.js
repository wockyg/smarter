import {api} from '../index';
import { useQuery } from "react-query";

const getFcePpdNextWeekDashboard = (initials) => api
                        .get(`/referralsView/dashboard/nextweek/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetFcePpdNextWeekDashboard(initials) {

  async function getAllFcePpdNextWeekDashboard() {
    const data = await getFcePpdNextWeekDashboard(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['nextweekCC', initials], getAllFcePpdNextWeekDashboard, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}