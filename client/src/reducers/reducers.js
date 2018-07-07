import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import topLevelReducer from './topLevel';
import formsReducer from './forms';
import userScreenReducer from './userScreen';

const contactApp = combineReducers({
  form: formReducer,
  main: topLevelReducer,
  userScreen: userScreenReducer,
});

export default contactApp;
