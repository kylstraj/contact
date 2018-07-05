import React from 'react';

const ContactCard = ({contact, expanded}) => (
  expanded
    ? (
        <ul>
          <li>{contact.name}</li>
          <li>phone: {contact.phone}</li>
          <li>email: {contact.email}</li>
          <li>address: {contact.address}</li>
        </ul>
      )
    : (
        <p>{contact.name}</p>
      )
);

export default ContactCard;
