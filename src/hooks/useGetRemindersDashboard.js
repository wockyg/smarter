import {api} from '../index';
import { useQuery } from "react-query";

const getRemindersDashboard = (initials) => api
                        .get(`/referralsView/dashboard/reminders/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetRemindersDashboard(initials) {

  async function getAllRemindersDashboard() {
    const data = await getRemindersDashboard(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['remindersDashboard'], getAllRemindersDashboard, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}