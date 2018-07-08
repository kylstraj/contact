import { connect } from 'react-redux';
import SearchUsersScreen from '../components/screens/searchUsers';
import {
  startSearchUsers,
  usersSearched,
} from '../actions/actions';

const mapStateToProps = state => (
  {
    credentials: state.main.credentials,
    inProgress: state.searchUsers.searchInProgress,
    usersFound: state.searchUsers.searchResults,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onSearchClick: (searchStr, credentials) => {
      dispatch(startSearchUsers());
      fetch(`/api/search_users/${searchStr}`,
        {
          body: JSON.stringify({credentials}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .then(res => {
          dispatch(usersSearched(res));
          return res.users;
        });
    },
  }
);

const SearchUsersScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchUsersScreen);

export default SearchUsersScreenContainer;
