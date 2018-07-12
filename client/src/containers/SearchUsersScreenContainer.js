import { connect } from 'react-redux';
import SearchUsersScreen from '../components/screens/searchUsers';
import {
  infoShared,
  startSearchUsers,
  startShareInfo,
  usersSearched,
} from '../actions/actions';

const mapStateToProps = state => (
  {
    contacts: state.main.contacts.map(contact => contact.username),
    inProgress: state.searchUsers.searchInProgress,
    sharesInProgress: state.searchUsers.sharesInProgress,
    shareResults: state.searchUsers.shareResults,
    usersFound: state.searchUsers.searchResults,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onSearchClick: (searchStr, contacts) => {
      dispatch(startSearchUsers());
      fetch(`/api/search_users/${searchStr}`,
        {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
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
      fetch(`/api/user/share_info/${sharee}`,
        {
          body: JSON.stringify({credentials}),
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .then(res => {
          dispatch(infoShared(sharee));
          return res;
        });
    },
  }
);

const SearchUsersScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchUsersScreen);

export default SearchUsersScreenContainer;
