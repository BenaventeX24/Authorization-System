import { configureStore } from '@reduxjs/toolkit';

import { accessTokenSlice } from './reducers/tokenReducer';
import { userReducer } from './reducers/userReducer';

const store = configureStore({
  reducer: {
    accessToken: accessTokenSlice.reducer,
    user: userReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
