import {api} from '../index';
import { useQuery } from "react-query";

const getEmployersDropdown = () => api
                        .get('/employers/dropdown')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetEmployersDropdown() {

  async function getAllEmployersDropdown() {
    const data = await getEmployersDropdown();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['employersdropdown'], getAllEmployersDropdown, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}