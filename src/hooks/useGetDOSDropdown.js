import {api} from '../index';
import { useQuery } from "react-query";

const getDOSDropdown = (referralId) => api
                        .get(`/dptBillingVisitsView/dosDropdown/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetDOSDropdown(referralId) {

  async function getAllDOSDropdown() {
    const data = await getDOSDropdown(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['dosDropdown', referralId], getAllDOSDropdown, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}