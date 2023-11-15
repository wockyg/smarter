import {api} from '../index';
import { useQuery } from "react-query";

const getRecordsRequest = () => api
                        .get('/referralsView/recordsRequest')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetRecordsRequest() {

  async function getAllRecordsRequest() {
    const data = await getRecordsRequest();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['recordsRequest'], getAllRecordsRequest, {
    staleTime: (60 * (60 * 1000)), // 60 min 
    cacheTime: (75 * (60 * 1000)), // 75 min
  });

}