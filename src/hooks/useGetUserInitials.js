import {api} from '../index';
import { useQuery } from "react-query";

const getUserInitials = (initials) => api
                        .get(`/users/initials/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetUserInitials(initials) {

  async function getOneUserInitials() {
    const data = await getUserInitials(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`userInitials`], getOneUserInitials, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}