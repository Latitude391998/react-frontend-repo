import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: any;
  accessToken: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const accessToken = action.payload.accessToken;
      localStorage.setItem('accessToken', accessToken);
      state.user = action.payload.user;
      state.accessToken = accessToken;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
