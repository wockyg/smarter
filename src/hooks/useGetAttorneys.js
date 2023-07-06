import {api} from '../index';
import { useQuery } from "react-query";

const getAttorneys = () => api
                        .get('/attorneys')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAttorneys() {

  async function getAllAttorneys() {
    const data = await getAttorneys();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['attorneys'], getAllAttorneys, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}