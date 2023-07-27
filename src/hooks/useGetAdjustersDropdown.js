import {api} from '../index';
import { useQuery } from "react-query";

const getAdjustersDropdown = () => api
                        .get('/adjustersView/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetAdjustersDropdown() {

  async function getAllAdjustersDropdown() {
    const data = await getAdjustersDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['adjustersdropdown'], getAllAdjustersDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}