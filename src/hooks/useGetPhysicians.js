import {api} from '../index';
import { useQuery } from "react-query";

const getPhysicians = () => api
                        .get('/physicians')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetPhysicians() {

  async function getAllPhysicians() {
    const data = await getPhysicians();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['physicians'], getAllPhysicians, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}