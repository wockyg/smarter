import {api} from '../index';
import { useQuery } from "react-query";

const getTherapistsAddresses = () => api
                        .get('/therapists/addresses')
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetTherapistsAddresses() {

  async function getAllTherapistsAddresses() {
    const data = await getTherapistsAddresses();
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery(['therapistsaddresses'], getAllTherapistsAddresses, { 
    staleTime: (5 * (60 * 1000)), // 5 min
    cacheTime: (10 * (60 * 1000)), // 10 min
  });

}