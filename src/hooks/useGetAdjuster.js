import {api} from '../index';
import { useQuery } from "react-query";

const getAdjuster = (id) => api
                        .get(`/adjustersView/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAdjuster(id) {

  async function getOneAdjuster() {
    const data = await getAdjuster(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`adjuster${id}`], getOneAdjuster, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}