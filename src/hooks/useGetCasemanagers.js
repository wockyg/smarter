import {api} from '../index';
import { useQuery } from "react-query";

const getCasemanagers = () => api
                        .get('/casemanagersView')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetCasemanagers() {

  async function getAllCasemanagers() {
    const data = await getCasemanagers();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['casemanagers'], getAllCasemanagers, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}