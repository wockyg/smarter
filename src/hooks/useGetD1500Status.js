import {api} from '../index';
import { useQuery } from "react-query";

const getD1500Status = (id) => api
                        .get(`/d1500/status/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetD1500Status(id) {

  async function getAllD1500Status() {
    const data = await getD1500Status(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['d1500Status'], getAllD1500Status, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
    // refetchInterval: (1 * (1 * 1000)), // 1 sec
  });

}