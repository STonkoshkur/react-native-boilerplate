// redux
import { createSelector } from '@reduxjs/toolkit';
// types
import { RootState } from 'src/store';

type ExtendedUser = NonNullable<RootState['auth']['user']> & {
  fullName: string | null;
  initials: string | null;
};

export const getAuthUserSelector = createSelector(
  ({ auth }: RootState) => auth.user,
  (user): ExtendedUser | null => {
    if (user) {
      const { firstName, lastName } = user;

      return {
        ...user,
        fullName: firstName ? `${firstName} ${lastName ?? ''}`.trim() : null,
        initials: firstName?.[0]
          ? `${firstName[0]}${lastName?.[0] ?? ''}`
          : null,
      };
    }

    return user;
  },
);

export const getAuthTokenSelector = createSelector(
  ({ auth }: RootState) => auth.token,
  (token) => token,
);
