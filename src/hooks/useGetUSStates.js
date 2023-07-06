import {api} from '../index';
import { useQuery } from "react-query";

const getStates = () => api
                        .get('/states')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetStates() {

  async function getAllStates() {
    const data = await getStates();
    console.log('data: ', data);
    return data;
  }
    
  return useQuery(['us-states'], getAllStates, { 
    staleTime: 5 * (60 * (60 * 1000)), // 5 hrs 
    cacheTime: 6 * (60 * (60 * 1000)), // 6 hrs 
  });

}