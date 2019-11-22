import { API } from 'aws-amplify';

const ENDPOINT = 'notes';

export const bill = async (storage: number, source: string) => {
  return await API.post(ENDPOINT, `/billing`, {
    body: {
      storage,
      source,
    },
  });
};
