import {api} from '../index';
import { useQuery } from "react-query";

const getD1500View = (referralId) => api
                        .get(`/d1500View/claim/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetD1500ViewClaim(referralId) {

  async function getAllD1500View() {
    const data = await getD1500View(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`d1500View_claim_${referralId}`, referralId], getAllD1500View, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}