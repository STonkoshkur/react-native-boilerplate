import { createSelector } from '@reduxjs/toolkit';
import { PersistedState } from 'redux-persist';

export const getPersistRehydratedSelector = createSelector(
  (state: PersistedState) => state?._persist?.rehydrated,
  (rehydrated) => rehydrated,
);
