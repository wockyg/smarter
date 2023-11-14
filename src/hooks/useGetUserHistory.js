import {api} from '../index';
import { useQuery } from "react-query";

const getUserHistory = (initials) => api
                        .get(`/users/history/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetUserHistory(initials) {

  async function getOneUserHistory() {
    const data = await getUserHistory(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`userHistory`], getOneUserHistory, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}