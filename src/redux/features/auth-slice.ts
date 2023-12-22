import { createSlice, PayloadAction } from '@reduxjs/toolkit/react';
import { PURGE } from 'redux-persist';

type AuthState = {
  token: string | null;
  user: {
    email: string | null;
    id: number | null;
  };
};

const initialState: AuthState = {
  token: null,
  user: {
    email: null,
    id: null,
  },
};

export type AuthInfo = {
  token: string;
  email: string;
  id: number;
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<AuthInfo>) {
      state.token = action.payload.token;
      state.user.email = action.payload.email;
      state.user.id = action.payload.id;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      console.log('logout');
      return initialState;
    });
  },
});

export default auth.reducer;
export const { signIn } = auth.actions;
