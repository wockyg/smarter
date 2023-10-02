import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsSearch = (values) => api
                        .get('/referralsView/search', values)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsSearch(values) {

  async function getSpecificReferralsSearch() {
    const data = await getReferralsSearch(values);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`referralsearch`], getSpecificReferralsSearch, { 
    staleTime: (1 * (60 * 1000)), // 1 min 
    cacheTime: (5 * (60 * 1000)), // 5 min
    enabled: false
  });

}