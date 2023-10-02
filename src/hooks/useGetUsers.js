import {api} from '../index';
import { useQuery } from "react-query";

const getUsers = () => api
                        .get('/users')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetUsers() {

  async function getAllUsers() {
    const data = await getUsers();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['users'], getAllUsers, { 
    staleTime: (1 * (60 * 1000)), // 1 min
    cacheTime: (5 * (60 * 1000)), // 5 min
    refetchInterval: (1 * (60 * 1000)), // 1 min
  });

}