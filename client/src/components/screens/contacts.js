import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Button from '../shared/Button';
import renderTextField from '../../utils/renderTextField';

const styles = {
  open: {
    maxWidth: 300,
    margin: '1em',
  },
  closed: {
    maxWidth: 300,
    margin: '1em',
  },
};

const OpenContactCard = ({classes, contact, onContactClick}) => (
  <Card className={classes.open} onClick={() => onContactClick(contact)}>
    <CardContent>
      <h3>{contact.name}</h3>
      <p>Address: {contact.address}</p>
      <p>Email: {contact.email}</p>
      <p>Phone: {contact.phone}</p>
    </CardContent>
  </Card>
);

const ClosedContactCard = ({classes, contact, onContactClick}) => (
  <Card className={classes.closed} onClick={() => onContactClick(contact)}>
    <CardContent>
      <h3>{contact.name}</h3>
    </CardContent>
  </Card>
);

let ContactCard = ({isOpen, ...other}) =>
  isOpen
    ? <OpenContactCard {...other}/>
    : <ClosedContactCard {...other}/>

ContactCard = withStyles(styles)(ContactCard);

const ContactList = ({contacts, contactsOpen, onContactClick}) => 
  contacts.map(contact =>
    <ContactCard 
      key={contact.username} 
      contact={contact} 
      isOpen={contactsOpen[contact.username]}
      onContactClick={onContactClick}
    />);

let ContactSearch = ({handleChange}) =>
  (<form>
    <Field onChange={handleChange} autoComplete='off' name='contactName' type='text' label='Name: ' component={renderTextField}/>
  </form>);

ContactSearch = reduxForm({
  form: 'contact-search',
})(ContactSearch);

const ContactsScreen = ({contactsDisplayed, contacts, onSearchClick, ...other}) => 
  contacts.length === 0
    ? <h2>You have no contacts</h2>
    : (<div>
        <ContactSearch onChange={data => onSearchClick(data.contactName, contacts)}/>
        <ContactList contacts={contactsDisplayed} {...other}/>
      </div>);
        

export default ContactsScreen;
