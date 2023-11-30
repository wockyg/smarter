import {api} from '../index';
import { useQuery } from "react-query";

const getRemindersDashboardCC = (initials) => api
                        .get(`/referralsView/dashboard/14days/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetRemindersDashboardCC(initials) {

  async function getAllRemindersDashboardCC() {
    const data = await getRemindersDashboardCC(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['14daysCC'], getAllRemindersDashboardCC, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}