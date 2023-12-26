import {api} from '../index';
import { useQuery } from "react-query";

const getAscending = () => api
                        .get('/timestamps/ascending')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAscending() {

  async function getAllAscending() {
    const data = await getAscending();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['ascending'], getAllAscending, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}