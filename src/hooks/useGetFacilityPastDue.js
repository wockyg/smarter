import {api} from '../index';
import { useQuery } from "react-query";

const getFacilityPastDue = () => api
                        .get(`/dptBillingVisitsView/facilityPastDue`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetFacilityPastDue() {

  async function getAllFacilityPastDue() {
    const data = await getFacilityPastDue();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['facilityPastDue'], getAllFacilityPastDue, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}