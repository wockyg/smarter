import {api} from '../index';
import { useQuery } from "react-query";

const getUser = (email) => api
                        .get(`/users/${email}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetUser(email) {

  async function getOneUser() {
    const data = await getUser(email);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`user`], getOneUser, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}