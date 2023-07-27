import {api} from '../index';
import { useQuery } from "react-query";

const getTherapistsDropdown = () => api
                        .get('/therapists/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetTherapistsDropdown() {

  async function getAllTherapistsDropdown() {
    const data = await getTherapistsDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['therapistsdropdown'], getAllTherapistsDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}