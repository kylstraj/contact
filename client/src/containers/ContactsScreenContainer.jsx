import { connect } from 'react-redux';
import { toggleContactOpen } from '../actions/actions';
import ContactsScreen from '../components/screens/contacts';

const mapStateToProps = state => (
  {
    contacts: state.main.contacts,
    contactsOpen: state.contactsScreen.contactsOpen,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onContactClick: contact => dispatch(toggleContactOpen(contact)),
  }
);

const ContactsScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsScreen);

export default ContactsScreenContainer;
