import {api} from '../index';
import { useQuery } from "react-query";

const getAttorneysDropdown = () => api
                        .get('/attorneys/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAttorneysDropdown() {

  async function getAllAttorneysDropdown() {
    const data = await getAttorneysDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['attorneysdropdown'], getAllAttorneysDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}