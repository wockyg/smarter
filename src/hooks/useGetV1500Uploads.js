import {api} from '../index';
import { useQuery } from "react-query";

const getV1500Uploads = () => api
                        .get(`/v1500View/uploads`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetV1500Uploads() {

  async function getAllV1500Uploads() {
    
    const data = await getV1500Uploads();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['v1500Uploads'], getAllV1500Uploads, { 
    staleTime: (1 * (60 * 1000)), // 1 min
    cacheTime: (2 * (60 * 1000)), // 2 min
    refetchInterval: (1 * (5 * 1000)), // 5 sec
  });

}