import {api} from '../index';
import { useQuery } from "react-query";

const getRRLastWorked = () => api
                        .get('/timestamps/rrlastworked')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetRRLastWorked() {

  async function getAllRRLastWorked() {
    const data = await getRRLastWorked();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['rrlastworked'], getAllRRLastWorked, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}