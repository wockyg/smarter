import {api} from '../index';
import { useQuery } from "react-query";

const getD1500NotApproved = () => api
                        .get(`/d1500View/notApproved`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetD1500NotApproved() {

  async function getAllD1500NotApproved() {
    const data = await getD1500NotApproved();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['d1500NotApproved'], getAllD1500NotApproved, { 
    staleTime: (1 * (60 * 1000)), // 1 min
    cacheTime: (2 * (60 * 1000)), // 2 min
  });

}