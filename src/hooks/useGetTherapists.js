import {api} from '../index';
import { useQuery } from "react-query";

const getTherapists = () => api
                        .get('/therapists')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetTherapists() {

  async function getAllTherapists() {
    const data = await getTherapists();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['therapists'], getAllTherapists, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}