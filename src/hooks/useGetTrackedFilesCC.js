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
    staleTime: (5 * (60 * 1000)), // 5 min 
    cacheTime: (6 * (60 * 1000)), // 6 min
  });

}