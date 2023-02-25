import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserData {
  name: string;
  surname: string;
}

export const userReducer = createSlice({
  name: 'username',
  initialState: {
    name: '',
    surname: '',
  },
  reducers: {
    setData: (state: IUserData, action: PayloadAction<IUserData>) =>
      (state = action.payload),
  },
});

export const userActions = userReducer.actions;
