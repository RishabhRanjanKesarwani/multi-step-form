import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import controlsReducer from '../reducers/controls/controlsSlice';
import userDetailsReducer from '../reducers/userDetails/userDetailsSlice';

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    controls: controlsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
