import { combineReducers } from 'redux';
//import { userReducer } from './userRedux/userReducer';
import fileReducer from './fileRedux/fileReducer';
export const rootReducer = combineReducers({
  //userReducer,
  fileReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
