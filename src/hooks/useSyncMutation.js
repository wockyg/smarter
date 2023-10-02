import {useMutation} from 'react-query';

const useSyncMutation = (mutationFn, options) => {
  const mutationResults = useMutation(mutationFn, options);

  return {
    ...mutationResults,
    mutate: (...params) => {
      if (!mutationResults.isLoading) {
        mutationResults.mutate(...params);
      }
    }
  };
};

export default useSyncMutation;