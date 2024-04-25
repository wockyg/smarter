import {api} from '../index';
import { useQuery } from "react-query";

const getD1500RowsView = (referralId) => api
                        .get(`/d1500RowsView/claim/${referralId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetD1500RowsViewClaim(referralId) {

  async function getAllD1500RowsView() {
    const data = await getD1500RowsView(referralId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`D1500RowsView_claim_${referralId}`, referralId], getAllD1500RowsView, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}