import {api} from '../index';
import { useQuery } from "react-query";

const getTherapist = (id) => api
                        .get(`/therapists/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetTherapist() {

  async function getOneTherapist() {
    const data = await getTherapist();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['therapist'], getOneTherapist, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}