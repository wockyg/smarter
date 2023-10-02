import {api} from '../index';
import { useQuery } from "react-query";

const getD1500View = (hfaId) => api
                        .get(`/d1500View/hcfa/${hfaId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetD1500ViewHcfa(hcfaId) {

  async function getAllD1500View() {
    const data = await getD1500View(hcfaId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`d1500View_hcfa_${hcfaId}`, hcfaId], getAllD1500View, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}