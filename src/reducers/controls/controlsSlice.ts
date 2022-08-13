import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Controls from '../../types/controls';

const initialState: Controls = {
  isStep1Complete: false,
  isStep2Complete: false,
  isStep3Complete: false,
  isStep1Frozen: false,
  isStep2Frozen: false,
  isStep3Frozen: false,
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
    onStep1FrozenChange: (state, action: PayloadAction<boolean>) => {
      state.isStep1Frozen = action.payload;
    },
    onStep2FrozenChange: (state, action: PayloadAction<boolean>) => {
      state.isStep2Frozen = action.payload;
    },
    onStep3FrozenChange: (state, action: PayloadAction<boolean>) => {
      state.isStep3Frozen = action.payload;
    },
    onAllControlsUpdate: (state, action: PayloadAction<Controls>) => {
      state.isStep1Complete = action.payload.isStep1Complete;
      state.isStep1Frozen = action.payload.isStep1Frozen;
      state.isStep2Complete = action.payload.isStep2Complete;
      state.isStep2Frozen = action.payload.isStep2Frozen;
      state.isStep3Complete = action.payload.isStep3Complete;
      state.isStep3Frozen = action.payload.isStep3Frozen;
    },
    onControlsReset: (state) => {
      state.isStep1Complete = false;
      state.isStep1Frozen = false;
      state.isStep2Complete = false;
      state.isStep2Frozen = false;
      state.isStep3Complete = false;
      state.isStep3Frozen = false;
    }
  },
});

export const { onStep1StateChange, onStep2StateChange, onStep3StateChange, onStep1FrozenChange, onStep2FrozenChange, onStep3FrozenChange, onAllControlsUpdate, onControlsReset } = controlsSlice.actions;

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
