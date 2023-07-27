import {api} from '../index';
import { useQuery } from "react-query";

const getTherapistsSearchAll = () => api
                        .get('/therapists/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetTherapistsSearchAll() {

  async function getAllTherapistsSearchAll() {
    const data = await getTherapistsSearchAll();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['therapistsearchall'], getAllTherapistsSearchAll, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}