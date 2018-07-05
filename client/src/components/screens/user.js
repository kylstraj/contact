import React, { Component } from 'react';
import ContactCard from '../ContactCard';

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

class Contacts extends Component {
  componentDidMount() {
    const { credentials, fetchContacts } = this.props;
    fetchContacts(credentials);
  }

  renderCards(contacts) {
    return contacts.map((contact, idx) => 
      <ContactCard contact={contact} expanded={true} key={idx}/>);
  }

  render() {
    return (
      <div>
        {this.renderCards(this.props.contacts)}
      </div>
    );
  }
};

const UserScreen = ({ credentials, contacts, fetchContacts, user }) => {
  if (user.name !== undefined) {
    const cards = Object.keys(cardTitles).map(
      key => <FactCard fact={ user[cardTitles[key]] } title={ key } key={key}/>
    );
    return (
      <div>
        <h2>{ user.name }</h2>
        { cards }
        <Contacts credentials={credentials} contacts={contacts} fetchContacts={fetchContacts}/>
      </div>
    );
  } else {
    return (
      <h2>You aren't logged in, silly</h2>
    );
  }
};

export default UserScreen;

