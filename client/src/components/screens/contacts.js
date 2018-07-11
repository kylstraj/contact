import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

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

const ContactsScreen = ({contacts, contactsOpen, onContactClick}) => 
  contacts.length === 0
    ? <h2>You have no contacts</h2>
    : contacts.map(contact =>
      <ContactCard 
        key={contact.username} 
        contact={contact} 
        isOpen={contactsOpen[contact.username]}
        onContactClick={onContactClick}
      />);

export default ContactsScreen;
