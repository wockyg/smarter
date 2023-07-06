import {api} from '../index';
import { useQuery } from "react-query";

const getAdjusterPastDue = () => api
                        .get(`/dptBillingVisitsView/adjusterPastDue`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAdjusterPastDue() {

  async function getAllAdjusterPastDue() {
    const data = await getAdjusterPastDue();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['adjusterPastDue'], getAllAdjusterPastDue, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}