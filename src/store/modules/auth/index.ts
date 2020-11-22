// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// entities
import { User } from 'src/entities/User';
// dtos
import { Token } from 'src/dtos/Auth';

type AuthSliceState = {
  token: Token | null;
  user: User | null;
};

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  } as AuthSliceState,
  reducers: {
    updateAuthUser(state, { payload }: PayloadAction<User>): void {
      state.user = payload;
    },
    updateAuthToken(state, { payload }: PayloadAction<Token>): void {
      state.token = payload;
    },
    clearAuth(state): void {
      state.token = null;
      state.user = null;
    },
  },
});

// name
export const sliceName = authSlice.name;

// actions
export const { updateAuthUser, updateAuthToken, clearAuth } = authSlice.actions;

// reducer
export default authSlice.reducer;
