import React from 'react';

const ContactCard = ({contact, isOpen, onContactClick}) =>
  isOpen
    ? (
        <div className='contact-card' onClick={ () => onContactClick(contact) }>
          <h3>{contact.name}</h3>
          <p>Address: {contact.address}</p>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </div>
      )
    : (
        <div className='contact-card' onClick={ () => onContactClick(contact) }>
          {contact.name}
        </div>
      );

const ContactsScreen = ({contacts, contactsOpen, onContactClick}) => 
  contacts.map(contact =>
    <ContactCard 
      key={contact.username} 
      contact={contact} 
      isOpen={contactsOpen[contact.username]}
      onContactClick={onContactClick}
    />);

export default ContactsScreen;
