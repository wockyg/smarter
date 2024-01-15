import {api} from '../index';
import { useQuery } from "react-query";

const getTrackedFiles = () => api
                        .get(`/referralsView/dashboard/tracked`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetTrackedFilesAll() {

  async function getAllTrackedFiles() {
    const data = await getTrackedFiles();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['trackedFiles'], getAllTrackedFiles, { 
    staleTime: (5 * (60 * 1000)), // 5 min 
    cacheTime: (6 * (60 * 1000)), // 6 min
  });

}