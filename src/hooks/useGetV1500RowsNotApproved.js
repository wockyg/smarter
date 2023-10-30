import {api} from '../index';
import { useQuery } from "react-query";

const getV1500RowsNotApproved = () => api
                        .get(`/v1500RowsView/notApproved`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetV1500RowsNotApproved() {

  async function getAllV1500RowsNotApproved() {
    const data = await getV1500RowsNotApproved();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['v1500RowsNotApproved'], getAllV1500RowsNotApproved, { 
    staleTime: (1 * (60 * 1000)), // 1 min
    cacheTime: (2 * (60 * 1000)), // 2 min
    refetchInterval: (1 * (5 * 1000)), // 5 sec
  });

}