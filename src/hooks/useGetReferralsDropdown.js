import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsDropdown = () => api
                        .get('/referralsView/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsDropdown() {

  async function getAllReferralsDropdown() {
    const data = await getReferralsDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralsdropdown'], getAllReferralsDropdown, { 
    staleTime: (1* (60 * 1000)), // 1 min 
    cacheTime: (2 * (60 * 1000)), // 2 min
  });

}