import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import controlsReducer from '../reducers/controls/controlsSlice';
import confirmationPageReducer from '../reducers/form/confirmationPageSlice';
import officeDetailsReducer from '../reducers/form/officeDetailsSlice';
import personalInfoReducer from '../reducers/form/personalInfoSlice';
import userDetailsReducer from '../reducers/userDetails/userDetailsSlice';

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
    controls: controlsReducer,
    personalInfo: personalInfoReducer,
    officeDetails: officeDetailsReducer,
    confirmationPage: confirmationPageReducer,
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
