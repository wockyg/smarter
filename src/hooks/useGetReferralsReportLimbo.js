import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsReportLimbo = () => api
                        .get('/referralsView/reportlimbo')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsReportLimbo() {

  async function getAllReferralsReportLimbo() {
    const data = await getReferralsReportLimbo();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['reportlimbo'], getAllReferralsReportLimbo, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}