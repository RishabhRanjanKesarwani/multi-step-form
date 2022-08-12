import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import OfficeDetails from '../../types/states/officeDetails';

const initialState: OfficeDetails = {
    workBuildingName: '',
    workCity: '',
    workLandlineNumber: '',
    workAddressLine1: '',
    workAddressLine2: '',
    workPOBoxNumber: '',
};

export const officeDetailsSlice = createSlice({
  name: 'officeDetails',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    uppdateOfficeDetails: (state, action: PayloadAction<OfficeDetails>) => {
        state = {...state, ...action.payload}
    },
  },
});

export const { uppdateOfficeDetails } = officeDetailsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getOfficeDetails = (state: RootState) => state.officeDetails;

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

export default officeDetailsSlice.reducer;
