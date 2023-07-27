import {api} from '../index';
import { useQuery } from "react-query";

const getClientsSearchAll = () => api
                        .get('/clients/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClientsSearchAll() {

  async function getAllClientsSearchAll() {
    const data = await getClientsSearchAll();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['clientsearchall'], getAllClientsSearchAll, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}