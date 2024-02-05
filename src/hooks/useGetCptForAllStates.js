import {api} from '../index';
import { useQuery } from "react-query";

const getCptForAllStates = () => api
                        .get(`/lookup_cpt/`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetCptForAllStates() {

  async function getAllCptForAllStates() {
    const data = await getCptForAllStates();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`lookup_cpt_all`], getAllCptForAllStates, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}