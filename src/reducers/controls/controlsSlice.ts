import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Controls from '../../types/controls';

const initialState: Controls = {
  isStep1Complete: false,
  isStep2Complete: false,
  isStep3Complete: false
};

export const controlsSlice = createSlice({
  name: 'controls',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onStep1StateChange: (state, action: PayloadAction<boolean>) => {
      state.isStep1Complete = action.payload;
    },
    onStep2StateChange: (state, action: PayloadAction<boolean>) => {
      state.isStep2Complete = action.payload;
    },
    onStep3StateChange: (state, action: PayloadAction<boolean>) => {
      state.isStep3Complete = action.payload;
    },
  },
});

export const { onStep1StateChange, onStep2StateChange, onStep3StateChange } = controlsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getControls = (state: RootState) => state.controls;

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

export default controlsSlice.reducer;
