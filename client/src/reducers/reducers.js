import { combineReducers } from 'redux';
import topLevelReducer from './topLevel';
import formsReducer from './forms';

const contactApp = combineReducers({
  topLevelReducer,
  formsReducer,
});

export default contactApp;
