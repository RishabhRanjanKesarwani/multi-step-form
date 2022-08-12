import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import PersonalInfo from '../../types/states/personalInfo';

const initialState: PersonalInfo = {
    name: '',
    email: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
};

export const personalInfoSlice = createSlice({
  name: 'personalInfo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    uppdatePersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
        state = {...state, ...action.payload}
    },
  },
});

export const { uppdatePersonalInfo } = personalInfoSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getPersonalInfo = (state: RootState) => state.personalInfo;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default personalInfoSlice.reducer;
