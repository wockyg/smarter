import {api} from '../index';
import { useQuery } from "react-query";

const getClaimantsSearchAll = () => api
                        .get('/claimantsView/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClaimantsSearchAll() {

  async function getAllClaimantsSearchAll() {
    const data = await getClaimantsSearchAll();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['claimantsearchall'], getAllClaimantsSearchAll, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}