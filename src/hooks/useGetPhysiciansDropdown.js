import {api} from '../index';
import { useQuery } from "react-query";

const getPhysiciansDropdown = () => api
                        .get('/physicians/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetPhysiciansDropdown() {

  async function getAllPhysiciansDropdown() {
    const data = await getPhysiciansDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['physiciansdropdown'], getAllPhysiciansDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}