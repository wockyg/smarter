import {api} from '../index';
import { useQuery } from "react-query";

const getClaimantsDropdown = () => api
                        .get('/claimantsView/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClaimantsDropdown() {

  async function getAllClaimantsDropdown() {
    const data = await getClaimantsDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['claimantsdropdown'], getAllClaimantsDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}