import {api} from '../index';
import { useQuery } from "react-query";

const getClaimants = () => api
                        .get('/claimantsView')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClaimants() {

  async function getAllClaimants() {
    const data = await getClaimants();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['claimants'], getAllClaimants, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}