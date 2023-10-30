import {api} from '../index';
import { useQuery } from "react-query";

const getD1500RowsView = (hfaId) => api
                        .get(`/d1500RowsView/hcfa/${hfaId}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetD1500RowsViewHcfa(hcfaId) {

  async function getAllD1500RowsView() {
    const data = await getD1500RowsView(hcfaId);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`D1500RowsView_hcfa_${hcfaId}`, hcfaId], getAllD1500RowsView, { 
    staleTime: (10 * (60 * 1000)), // 10 min 
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}