import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import contactsScreenReducer from './contactsScreen';
import topLevelReducer from './topLevel';
import invitationReducer from './invitations';
import formsReducer from './forms';
import searchUsersReducer from './searchUsersScreen';
import userScreenReducer from './userScreen';
import registerScreenReducer from './registerScreen';

const contactApp = combineReducers({
  contactsScreen: contactsScreenReducer,
  form: formReducer,
  invitations: invitationReducer,
  main: topLevelReducer,
  registerScreen: registerScreenReducer,
  searchUsers: searchUsersReducer,
  userScreen: userScreenReducer,
});

export default contactApp;
