import {api} from '../index';
import { useQuery } from "react-query";

const getClients = () => api
                        .get('/clients')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClients() {

  async function getAllClients() {
    const data = await getClients();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['clients'], getAllClients, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}