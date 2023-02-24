import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: '',
  reducers: {
    setToken: (state: string, action: PayloadAction<string>) => (state = action.payload),
  },
});

export const authContextSlice = createSlice({
  name: 'isAuth',
  initialState: false,
  reducers: {
    setAuth: (state: boolean, action: PayloadAction<boolean>) => (state = action.payload),
  },
});

export const tokenActions = accessTokenSlice.actions;
export const authActions = authContextSlice.actions;
