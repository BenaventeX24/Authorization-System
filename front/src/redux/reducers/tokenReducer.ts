import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: '',
  reducers: {
    setToken: (state: string, action: PayloadAction<string>) => (state = action.payload),
  },
});

export const tokenActions = accessTokenSlice.actions;
