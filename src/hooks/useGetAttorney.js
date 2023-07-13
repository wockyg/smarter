import {api} from '../index';
import { useQuery } from "react-query";

const getAttorney = (id) => api
                        .get(`/attorneys/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAttorney() {

  async function getOneAttorney() {
    const data = await getAttorney();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['attorney'], getOneAttorney, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}