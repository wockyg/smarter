import {api} from '../index';
import { useQuery } from "react-query";

const getFceppdBillingAdjPastDue = () => api
                        .get(`/fceppdBillingView/adjusterPastDue`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetFceppdBillingAdjPastDue() {

  async function getAllFceppdBillingAdjPastDue() {
    const data = await getFceppdBillingAdjPastDue();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['fceppdBillingAdjPastDue'], getAllFceppdBillingAdjPastDue, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}