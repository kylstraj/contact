import { connect } from 'react-redux';
import SearchUsersScreen from '../components/screens/searchUsers';

const mapStateToProps = state => (
  {
    usersFound: [{name: 'Amy Abramowitz', username: 'abramowitza'}],
  }
);

const mapDispatchToProps = dispatch => (
  {
    onSearchClick: searchStr => alert(`Searching for names matching ${searchStr}`),
  }
);

const SearchUsersScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchUsersScreen);

export default SearchUsersScreenContainer;
