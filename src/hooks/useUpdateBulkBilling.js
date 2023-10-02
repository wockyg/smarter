import {api} from '../index';
import { useMutation, useQueryClient } from "react-query";
// import { useParams } from 'react-router-dom';
// import useGetReferral from './useGetReferral';

export default function useUpdateBulkBilling() {

  // let { id: linkId } = useParams();

  // const { status: statusReferral, data: selectedClaim, error: errorReferral, isFetching: isFetchingReferral } = useGetReferral(+linkId);

  const queryClient = useQueryClient();

  const updateBulkBilling = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'bulkBillingId'));
    const newValues = Object.fromEntries(filtered);

    api
      .put(`/bulkBilling/${values.bulkBillingId}`, newValues)
      .then(response => {
        const data = response.data;
        console.log(data);
        console.log(values);
        queryClient.invalidateQueries('bulkBilling');
        // if (selectedClaim.bulkBillingId === values.bulkBillingId) {
        //   queryClient.invalidateQueries(`therapist${selectedClaim.therapistId}`);
        // }
        // queryClient.invalidateQueries('therapistsearchall');
        // queryClient.invalidateQueries('therapistView');
        return data;
      });
  }
    
  return useMutation( (values) => updateBulkBilling(values), 
                      {onSuccess: () => {
                      console.log('successfully updated bulkBilling...');
                      }});

}