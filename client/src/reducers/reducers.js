import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import contactsScreenReducer from './contactsScreen';
import topLevelReducer from './topLevel';
import formsReducer from './forms';
import userScreenReducer from './userScreen';

const contactApp = combineReducers({
  contactsScreen: contactsScreenReducer,
  form: formReducer,
  main: topLevelReducer,
  userScreen: userScreenReducer,
});

export default contactApp;
