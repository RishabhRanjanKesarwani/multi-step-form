import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import ConfirmationPage from '../../types/states/confirmationPage';

const initialState: ConfirmationPage = {
    image: '',
    signature: '',
};

export const confirmationPageSlice = createSlice({
  name: 'confirmationPage',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    uppdateConfirmationPage: (state, action: PayloadAction<ConfirmationPage>) => {
        state = {...state, ...action.payload}
    },
  },
});

export const { uppdateConfirmationPage } = confirmationPageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getConfirmationPage = (state: RootState) => state.confirmationPage;

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

export default confirmationPageSlice.reducer;
