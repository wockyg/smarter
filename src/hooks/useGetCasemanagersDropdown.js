import {api} from '../index';
import { useQuery } from "react-query";

const getCasemanagersDropdown = () => api
                        .get('/casemanagersView/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetCasemanagersDropdown() {

  async function getAllCasemanagersDropdown() {
    const data = await getCasemanagersDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['casemanagersdropdown'], getAllCasemanagersDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}