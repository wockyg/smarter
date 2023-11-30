import {api} from '../index';
import { useQuery } from "react-query";

const getReminders = () => api
                        .get('/referralsView/reminders')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReminders() {

  async function getAllReminders() {
    const data = await getReminders();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['reminders'], getAllReminders, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}