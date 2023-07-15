import {api} from '../index';
import { useQuery } from "react-query";

const getReferral = (id) => api
                        .get(`/referralsView/${id}`)
                        .then(response => {
                        const data = response.data;
                        // console.log(data);
                        return data;
                        });

export default function useGetReferral(id) {

  async function getOneReferral() {
    const data = await getReferral(id);
    // console.log('data: ', data);
    return data;
  }
    
  return useQuery([`referral${id}`], getOneReferral);

}