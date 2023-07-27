import {api} from '../index';
import { useQuery } from "react-query";

const getClientsDropdown = () => api
                        .get('/clients/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClientsDropdown() {

  async function getAllClientsDropdown() {
    const data = await getClientsDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['clientsdropdown'], getAllClientsDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}