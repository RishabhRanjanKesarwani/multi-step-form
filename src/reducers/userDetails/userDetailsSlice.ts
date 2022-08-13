import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { FORM_INITIAL_STATE } from '../../constants';
import Error from '../../types/error';
import UserDetailsState from '../../types/states/userDetailsState';
import UserDetails from '../../types/userDetails';

const initialState: UserDetailsState = {
  data: {
    id: '',
    createdAt: '',
    updatedAt: '',
    ...FORM_INITIAL_STATE
  },
  loading: false,
  error: {
    errorCode: 0,
    errorMessage: ''
  }
};

export const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    onError: (state, action: PayloadAction<Error>) => {
        state.loading = false;
        state.error = action.payload;
    },
    onLoad: (state) => {
        state.loading = true;
    },
    onSuccess: (state, action: PayloadAction<UserDetails>) => {
        state.loading = false;
        state.error = {
          errorCode: 0,
          errorMessage: ''
        }
        state.data = {...state.data, ...action.payload}
    },
    onUserDetailsReset: (state) => {
      state.loading = false;
      state.error = {
        errorCode: 0,
        errorMessage: ''
      }
      state.data = {
        id: '',
        createdAt: '',
        updatedAt: '',
        ...FORM_INITIAL_STATE
      };
    }
  },
});

export const { onError, onLoad, onSuccess, onUserDetailsReset } = userDetailsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const getUserDetails = (state: RootState) => state.userDetails;

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

export default userDetailsSlice.reducer;
