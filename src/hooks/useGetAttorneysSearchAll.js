import {api} from '../index';
import { useQuery } from "react-query";

const getAttorneysSearchAll = () => api
                        .get('/attorneys/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAttorneysSearchAll() {

  async function getAllAttorneysSearchAll() {
    const data = await getAttorneysSearchAll();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['attorneysearchall'], getAllAttorneysSearchAll, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}