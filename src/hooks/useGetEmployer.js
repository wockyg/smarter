import {api} from '../index';
import { useQuery } from "react-query";

const getEmployer = (id) => api
                        .get(`/employers/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetEmployer(id) {

  async function getOneEmployer() {
    const data = await getEmployer(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`employer${id}`], getOneEmployer, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}