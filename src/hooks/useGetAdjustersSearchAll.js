import {api} from '../index';
import { useQuery } from "react-query";

const getAdjustersSearchAll = () => api
                        .get('/adjustersView/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAdjustersSearchAll() {

  async function getAllAdjustersSearchAll() {
    const data = await getAdjustersSearchAll();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['adjustersearchall'], getAllAdjustersSearchAll, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}