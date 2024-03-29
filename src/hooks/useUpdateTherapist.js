import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
import { useParams } from 'react-router-dom';
import useGetReferral from './useGetReferral';

import {setDefaults, fromAddress, geocode, RequestType} from "react-geocode";

export default function useUpdateTherapist() {

  setDefaults({
    key: "AIzaSyDZTDhDWFKMSUkvPEzKEVEyNCzZh0SFTw4",
    language: "en",
    region: "es",
    });

  let { id: linkId } = useParams();

  const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateTherapist = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'therapistId'));
    let newValues = Object.fromEntries(filtered);

    api
    .put(`/therapists/${values.therapistId}`, newValues)
    .then(response => {
      const data = response.data;
      console.log(data);
      console.log({therapistId: values.therapistId, ...newValues});
      if (selectedClaim.therapistId === values.therapistId) {
        queryClient.invalidateQueries(`referral${+linkId}`);
      }
      queryClient.invalidateQueries(`therapist${+values.therapistId}`);
      queryClient.invalidateQueries('therapists');
      queryClient.invalidateQueries('therapistsearchall');
      // queryClient.invalidateQueries('therapistsaddresses');
      queryClient.invalidateQueries('referralsearchall');
      queryClient.invalidateQueries('referrals');
      return data;
    })
    .catch(console.error);

    
  }
    
  return useMutation( (values) => updateTherapist(values), 
                      {onSuccess: () => {
                      console.log('successfully updated therapist...');
                      }});

}