import {api} from '../index';
import { useQuery } from "react-query";

const getMissingV1500 = () => api
                        .get(`/dptBillingVisitsView/missingV1500`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetMissingV1500() {

  async function getAllMissingV1500() {
    const data = await getMissingV1500();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['missingV1500'], getAllMissingV1500, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}