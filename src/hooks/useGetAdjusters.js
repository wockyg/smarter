import {api} from '../index';
import { useQuery } from "react-query";

const getAdjusters = () => api
                        .get('/adjustersView')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAdjusters() {

  async function getAllAdjusters() {
    const data = await getAdjusters();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['adjusters'], getAllAdjusters, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}