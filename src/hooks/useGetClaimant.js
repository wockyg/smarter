import {api} from '../index';
import { useQuery } from "react-query";

const getClaimant = (id) => api
                        .get(`/claimantsView/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetClaimant(id) {

  async function getOneClaimant() {
    const data = await getClaimant(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`claimant${id}`], getOneClaimant, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}