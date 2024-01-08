import {api} from '../index';
import { useQuery } from "react-query";

const getTrackedFilesCC = (initials) => api
                        .get(`/referralsView/dashboard/tracked/${initials}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetTrackedFilesCC(initials) {

  async function getAllTrackedFilesCC() {
    const data = await getTrackedFilesCC(initials);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['trackedFilescc', initials], getAllTrackedFilesCC, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}