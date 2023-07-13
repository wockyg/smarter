import {api} from '../index';
import { useQuery } from "react-query";

const getPhysician = (id) => api
                        .get(`/physicians/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetPhysician(id) {

  async function getOnePhysician() {
    const data = await getPhysician(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`physician${id}`], getOnePhysician, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}