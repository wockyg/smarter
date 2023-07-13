import {api} from '../index';
import { useQuery } from "react-query";

const getCasemanager = (id) => api
                        .get(`/casemanagersView/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetCasemanager() {

  async function getOneCasemanager() {
    const data = await getCasemanager();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['casemanager'], getOneCasemanager, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}