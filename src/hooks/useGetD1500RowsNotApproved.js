import {api} from '../index';
import { useQuery } from "react-query";

const getD1500RowsNotApproved = () => api
                        .get(`/d1500RowsView/notApproved`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetD1500RowsNotApproved() {

  async function getAllD1500RowsNotApproved() {
    const data = await getD1500RowsNotApproved();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['d1500RowsNotApproved'], getAllD1500RowsNotApproved, { 
    staleTime: (1 * (60 * 1000)), // 1 min
    cacheTime: (2 * (60 * 1000)), // 2 min
  });

}