// redux
import { createSelector } from '@reduxjs/toolkit';
// types
import { RootState } from 'src/store';

export const getAuthUserSelector = createSelector(
  ({ auth }: RootState) => auth.user,
  (user) => user,
);
