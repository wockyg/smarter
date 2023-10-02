import {api} from '../index';
import { useQuery } from "react-query";

const getCptForState = (state) => api
                        .get(`/lookup_cpt/state/${state}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetCptForState(state) {

  async function getAllCptForState() {
    const data = await getCptForState(state);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`lookup_cpt_${state}`, state], getAllCptForState, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}