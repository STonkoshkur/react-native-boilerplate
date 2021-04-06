// redux
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// entities
import { User } from 'src/entities/User';
// dtos
import { Token } from 'src/services/api/dtos/Auth';

type AuthSliceState = {
  token: Token | null;
  user: User | null;
};

const initialState: AuthSliceState = { token: null, user: null };

// slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
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
