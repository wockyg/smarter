import {api} from '../index';
import { useQuery } from "react-query";

const getReferralsSearch = () => api
                        .get('/referralsView/searchall')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferralsSearchAll() {

  async function getAllReferralsSearch() {
    const data = await getReferralsSearch();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['referralsearchall'], getAllReferralsSearch, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}