import React, { Component } from 'react';

const FactCard = ({ fact, title }) => (
  <div>
    <p>
      { title }: { fact }
    </p>
    <p>
      <button>Change</button>
    </p>
  </div>
);

const cardTitles = {
  "Your email": "email",
  "Your phone number": "phone",
  "Your address": "address",
};

const MyAccount = ({ user }) => {
  let cards = Object.keys(cardTitles).map(
    key => <FactCard fact={ user[cardTitles[key]] } title={ key } />
  );
  return (
    <div>
      <h2>{ user.firstName } { user.lastName }</h2>
      { cards }
    </div>
  );
};

export default MyAccount;

