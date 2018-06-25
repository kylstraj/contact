import React, { Component } from 'react';

const FactCard = ({ fact, title }) => (
  <div>
    <p>
      { title }: { fact }
    </p>
    <p>
      <button>Change { title }</button>
    </p>
  </div>
);

const MyAccount = ({ user }) => {
  let cards = Object.keys(user).map(
    key => <FactCard fact={ user[key] } title={key} />
  );
  return (
    <div>
      { cards }
    </div>
  );
};

export default MyAccount;

