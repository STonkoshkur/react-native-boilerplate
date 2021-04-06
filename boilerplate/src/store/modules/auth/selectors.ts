// redux
import { createSelector } from '@reduxjs/toolkit';
// types
import { RootState } from 'src/store/index';

export const getAuthUserSelector = createSelector(
  ({ auth }: RootState) => auth.user,
  (user) => user,
);

export const getAuthTokenSelector = createSelector(
  ({ auth }: RootState) => auth.token,
  (token) => token,
);
