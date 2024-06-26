import {api} from '../index';
import { useQueryClient } from "react-query";
import useSyncMutation from './useSyncMutation';

export default function useUpdateUser() {

  const queryClient = useQueryClient();

  const updateUser = (values) => {

    const asArray = Object.entries(values);
    const filtered = asArray.filter(([key, value]) => (key !== 'initials'));
    const newValues = Object.fromEntries(filtered);

    // console.log("newValues", newValues)

    api
      .put(`/users/${values.initials}`, newValues)
      .then(response => {
        const data = response.data;
        // console.log(data);
        // console.log(values);
        queryClient.invalidateQueries(`user`);
        queryClient.invalidateQueries(`users`);
        return data;
      });
  }
    
  return useSyncMutation( (values) => updateUser(values), 
                      {onSuccess: () => {
                      // console.log('successfully updated user...');
                      }});

}