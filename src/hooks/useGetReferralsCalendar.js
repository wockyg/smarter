import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsCalendar = () => api
                        .get('/referralsView/calendar')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsCalendar() {

  async function getAllReferralsCalendar() {
    const data = await getReferralsCalendar();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralscalendar'], getAllReferralsCalendar, { 
    staleTime: (1* (60 * 1000)), // 1 min 
    cacheTime: (2 * (60 * 1000)), // 2 min
  });

}