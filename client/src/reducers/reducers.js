import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import topLevelReducer from './topLevel';
import formsReducer from './forms';

const contactApp = combineReducers({
  main: topLevelReducer,
  form: formReducer,
});

export default contactApp;
