import {api} from '../index';
import { useQuery } from "react-query";

const getClient = (id) => api
                        .get(`/clients/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClient(id) {

  async function getOneClient() {
    const data = await getClient(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`client${id}`], getOneClient, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}