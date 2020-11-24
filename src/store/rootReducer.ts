// redux
import { combineReducers } from '@reduxjs/toolkit';
// reducers
import auth, { sliceName as authSliceName } from 'src/store/modules/auth';

const appReducer = combineReducers({
  auth,
});

// store clearing solution - by Dan Abramov
// https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store/35641992#35641992

const rootReducer: typeof appReducer = (state, action) => {
  if (action.type === `${authSliceName}/clearAuth`) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
