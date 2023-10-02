import {api} from '../index';
import { useQuery } from "react-query";

const getCptDropdown = () => api
                        .get('/lookup_cpt/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetCptDropdown() {

  async function getAllCptDropdown() {
    const data = await getCptDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['lookup_cpt_dropdown'], getAllCptDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}