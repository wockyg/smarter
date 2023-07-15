import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsMissingReport = () => api
                        .get('/referralsView/missingreport')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsMissingReport() {

  async function getAllReferralsMissingReport() {
    const data = await getReferralsMissingReport();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['missingreport'], getAllReferralsMissingReport, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}