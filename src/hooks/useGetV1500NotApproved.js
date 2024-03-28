import {api} from '../index';
import { useQuery, useQueryClient } from "react-query";

const getV1500NotApproved = () => api
                        .get(`/v1500View/notApproved`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetV1500NotApproved() {

  const queryClient = useQueryClient();

  async function getAllV1500NotApproved() {
    
    const data = await getV1500NotApproved();
    // console.log('data: ', data);
    queryClient.invalidateQueries('referralVisits');
    return data;
  }
    
  return useQuery(['v1500NotApproved'], getAllV1500NotApproved, { 
    staleTime: (1 * (60 * 1000)), // 1 min
    cacheTime: (2 * (60 * 1000)), // 2 min
    refetchInterval: (1 * (5 * 1000)), // 5 sec
  });

}