import { connect } from 'react-redux';
import SearchUsersScreen from '../components/screens/searchUsers';

const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => {};

const SearchUsersScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchUsersScreen);

export default SearchUsersScreenContainer;
