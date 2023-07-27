import {api} from '../index';
import { useQuery } from "react-query";

const getPhysiciansSearchAll = () => api
                        .get('/physicians/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetPhysiciansSearchAll() {

  async function getAllPhysiciansSearchAll() {
    const data = await getPhysiciansSearchAll();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['physiciansearchall'], getAllPhysiciansSearchAll, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}