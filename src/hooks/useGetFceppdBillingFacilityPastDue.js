import {api} from '../index';
import { useQuery } from "react-query";

const getFceppdBillingFacilityPastDue = () => api
                        .get(`/fceppdBillingView/facilityPastDue`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetFceppdBillingFacilityPastDue() {

  async function getAllFceppdBillingFacilityPastDue() {
    const data = await getFceppdBillingFacilityPastDue();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['fceppdBillingFacilityPastDue'], getAllFceppdBillingFacilityPastDue, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}