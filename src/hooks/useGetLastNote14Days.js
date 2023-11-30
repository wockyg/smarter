import {api} from '../index';
import { useQuery } from "react-query";

const getLastNote14Days = () => api
                        .get('/referralsView/14days')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetLastNote14Days() {

  async function getAllLastNote14Days() {
    const data = await getLastNote14Days();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['14days'], getAllLastNote14Days, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}