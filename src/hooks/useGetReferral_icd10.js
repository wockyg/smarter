import {api} from '../index';
import { useQuery } from "react-query";

const getReferral_icd10 = (referralId) => api
                        .get(`/referral_icd10/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferral_icd10(referralId) {

  async function getAllReferral_icd10() {
    const data = await getReferral_icd10(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referral_icd10', referralId], getAllReferral_icd10, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}