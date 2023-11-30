import {api} from '../index';
import { useQuery } from "react-query";

const getPTOAllUsers = () => api
                        .get('/pto')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetPTOAllUsers() {

  async function getAllPTOAllUsers() {
    const data = await getPTOAllUsers();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['pto'], getAllPTOAllUsers, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}