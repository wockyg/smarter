import {api} from '../index';
import { useQuery } from "react-query";

const getEmployersSearchAll = () => api
                        .get('/employers/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetEmployersSearchAll() {

  async function getAllEmployersSearchAll() {
    const data = await getEmployersSearchAll();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['employersearchall'], getAllEmployersSearchAll, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}