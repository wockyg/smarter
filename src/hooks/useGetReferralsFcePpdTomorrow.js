import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsFcePpdTomorrow = () => api
                        .get('/referralsView/fceppdtomorrow')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsFcePpdTomorrow() {

  async function getAllReferralsFcePpdTomorrow() {
    const data = await getReferralsFcePpdTomorrow();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['fceppdtomorrow'], getAllReferralsFcePpdTomorrow, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}