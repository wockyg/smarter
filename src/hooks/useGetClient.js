import {api} from '../index';
import { useQuery } from "react-query";

const getClient = (id) => api
                        .get(`/clients/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClient() {

  async function getOneClient() {
    const data = await getClient();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['client'], getOneClient, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}