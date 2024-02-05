import {api} from '../index';
import { useQuery } from "react-query";

const getAllFeeSchedules = () => api
                        .get('/lookup_cpt')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAllFeeSchedules() {

  async function getAllAllFeeSchedules() {
    const data = await getAllFeeSchedules();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['feeschedules'], getAllAllFeeSchedules, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}