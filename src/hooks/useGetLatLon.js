import {api} from '../index';
import { useQuery } from "react-query";

const getLatLon = (searchval) => api
                        .get(`/map/fromAddress/${searchval}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetLatLon(searchval) {

  async function getOneLatLon() {
    const data = await getLatLon(searchval);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`latlon`], getOneLatLon, { 
    staleTime: (10 * (60 * 1000)), // 10 min
    cacheTime: (15 * (60 * 1000)), // 15 min
  });

}