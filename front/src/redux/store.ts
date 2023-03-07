import { configureStore } from '@reduxjs/toolkit';

import { accessTokenSlice } from './reducers/tokenReducer';

const store = configureStore({
  reducer: {
    accessToken: accessTokenSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
