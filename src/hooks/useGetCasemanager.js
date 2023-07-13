import {api} from '../index';
import { useQuery } from "react-query";

const getCasemanager = (id) => api
                        .get(`/casemanagersView/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetCasemanager(id) {

  async function getOneCasemanager() {
    const data = await getCasemanager(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`casemanager${id}`], getOneCasemanager, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}