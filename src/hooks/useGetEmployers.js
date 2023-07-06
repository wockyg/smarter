import {api} from '../index';
import { useQuery } from "react-query";

const getEmployers = () => api
                        .get('/employers')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetEmployers() {

  async function getAllEmployers() {
    const data = await getEmployers();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['employers'], getAllEmployers, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}