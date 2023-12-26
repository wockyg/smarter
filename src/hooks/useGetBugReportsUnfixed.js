import {api} from '../index';
import { useQuery } from "react-query";

const getBugReports = () => api
                        .get('/bugReports/unfixed')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetBugReportsUnfixed() {

  async function getAllBugReports() {
    const data = await getBugReports();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['bugreports'], getAllBugReports, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}