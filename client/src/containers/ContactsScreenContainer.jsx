import { connect } from 'react-redux';
import { 
  contactsSearched,
  toggleContactOpen,
} from '../actions/actions';
import ContactsScreen from '../components/screens/contacts';

const mapStateToProps = state => (
  {
    contacts: state.main.contacts,
    contactsOpen: state.contactsScreen.contactsOpen,
    contactsDisplayed: state.contactsScreen.contactsDisplayed,
  }
);

const mapDispatchToProps = dispatch => (
  {
    onContactClick: contact => dispatch(toggleContactOpen(contact)),
    onSearchClick: (name, contacts) => {
      dispatch(contactsSearched(
        name
          ? contacts.filter(contact => 
              contact.name.toUpperCase().includes(name.toUpperCase()))
          : contacts
      ));
    },
  }
);

const ContactsScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsScreen);

export default ContactsScreenContainer;
