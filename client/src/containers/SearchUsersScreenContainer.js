import { connect } from 'react-redux';
import SearchUsersScreen from '../components/screens/searchUsers';
import {
  infoShared,
  invitationSent,
  startSearchUsers,
  startSendInvite,
  startShareInfo,
  usersSearched,
} from '../actions/actions';
import apiFetch from '../utils/apiFetch';

const mapStateToProps = state => (
  {
    contacts: state.main.contacts.map(contact => contact.username),
    inProgress: state.searchUsers.searchInProgress,
    requestsMade: state.searchUsers.requestsMade,
    sharesInProgress: state.searchUsers.sharesInProgress,
    shareResults: state.searchUsers.shareResults,
    usersFound: state.searchUsers.searchResults,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onSearchClick: (searchStr, contacts) => {
      dispatch(startSearchUsers());
      apiFetch(`/api/search_users/${searchStr}`)
        .then(users => users.map(user =>
          Object.assign(
            {},
            user,
            {
              hasInfo: contacts.indexOf(user.username) >= 0,
            },
          )))
        .then(res => {
          dispatch(usersSearched(res));
          return res.users;
        });
    },
    onShareClick: (sharee, credentials) => {
      dispatch(startShareInfo(sharee));
      apiFetch(`/api/user/share_info/${sharee}`)
        .then(res => {
          dispatch(infoShared(sharee));
          return res;
        });
    },
    onRequestClick: (invitee) => {
      dispatch(startSendInvite(invitee));
      apiFetch(`/api/user/invite/${invitee}?reciprocal=true`)
        .then(inv => {
          dispatch(invitationSent(inv));
          return inv;
        });
    },
  }
);

const SearchUsersScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchUsersScreen);

export default SearchUsersScreenContainer;
