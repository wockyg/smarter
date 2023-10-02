import {api} from '../index';
import { useQuery } from "react-query";

const getBulkBilling = () => api
                        .get('/bulkBilling')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetBulkBilling() {

  async function getAllBulkBilling() {
    const data = await getBulkBilling();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['bulkBilling'], getAllBulkBilling, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}