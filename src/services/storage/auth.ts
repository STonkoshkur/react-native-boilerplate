// store
import { store } from 'src/store';

export const getAuthToken = (): string | null | undefined => {
  const state = store.getState();

  return state.auth.token;
};
