import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsDropdownCalendar = () => api
                        .get('/referralsView/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsDropdownCalendar() {

  async function getAllReferralsDropdownCalendar() {
    const data = await getReferralsDropdownCalendar();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralsdropdown'], getAllReferralsDropdownCalendar, { 
    staleTime: (1* (60 * 1000)), // 1 min 
    cacheTime: (2 * (60 * 1000)), // 2 min
  });

}