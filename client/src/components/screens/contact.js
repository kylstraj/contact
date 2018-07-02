import React from 'react';

const ContactScreen = ({ data }) => (
  <dl>
    <dt>Name:</dt>
    <dd>{ data.contact.fullName }</dd>
    <dt>Address:</dt>
    <dd>{ data.contact.address }</dd>
    <dt>Email:</dt>
    <dd>{ data.contact.email }</dd>
    <dt>Phone:</dt>
    <dd>{ data.contact.phone }</dd>
  </dl>
);

export default ContactScreen;
