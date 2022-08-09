import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import controlsReducer from '../reducers/controls/controlsSlice';
import counterReducer from '../reducers/counter/counterSlice';
import userDetailsReducer from '../reducers/userDetails/userDetailsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
