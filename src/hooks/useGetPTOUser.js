import {api} from '../index';
import { useQuery } from "react-query";

const getPTOUser = (userId) => api
                        .get(`/pto/${userId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetPTOUser(userId) {

  async function getAllPTOUser() {
    const data = await getPTOUser(userId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`pto${userId}`], getAllPTOUser, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}