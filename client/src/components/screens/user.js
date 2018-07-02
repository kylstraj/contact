
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

const UserScreen = ({ data }) => {
  const user = data.user;
  if (user !== undefined) {
    const cards = Object.keys(cardTitles).map(
      key => <FactCard fact={ user[cardTitles[key]] } title={ key } />
    );
    return (
      <div>
        <h2>{ user.firstName } { user.lastName }</h2>
        { cards }
      </div>
    );
  } else {
    return (
      <h2>You aren't logged in, silly</h2>
    );
  }
};

export default UserScreen;

