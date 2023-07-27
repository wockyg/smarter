import {api} from '../index';
import { useQuery } from "react-query";

const getCasemanagersSearchAll = () => api
                        .get('/casemanagersView/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetCasemanagersSearchAll() {

  async function getAllCasemanagersSearchAll() {
    const data = await getCasemanagersSearchAll();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['casemanagersearchall'], getAllCasemanagersSearchAll, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}