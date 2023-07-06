import {api} from '../index';
import { useQuery } from "react-query";

const getD1500NotSent = () => api
                        .get(`/dptBillingVisitsView/d1500NotSent`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetD1500NotSent() {

  async function getAllD1500NotSent() {
    const data = await getD1500NotSent();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['d1500NotSent'], getAllD1500NotSent, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}