import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import ContactCard from '../ContactCard';

const FactCard = ({ fact, title, onSubmit, inFlux }) => (
  <form onSubmit={onSubmit}>
    <p>
      { title }: { inFlux ? 'Updating...' : fact }
    </p>
    <p>
      <button type='submit'>Change</button>
    </p>
  </form>
);


let EditCard = ({ fact, title, fieldName, handleSubmit, user }) => (
  <form onSubmit={handleSubmit}>
    <p>
      <label htmlFor={title}>{title}: </label>
      <Field name={fieldName} component='input' type='text' />
    </p>
    <p>
      <button>Save</button>
    </p>
  </form>
);

EditCard = reduxForm({
  form: 'editCard'
})(EditCard);

const cardTitles = {
  address: "Your address",
  email: "Your email",
  phone: "Your phone number",
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

const UserScreen = props => {
  const {
    contacts,
    credentials,
    editFormsOpen,
    fieldsInFlux,
    user,
  } = props;
  const {
    fetchContacts,
    onEditButtonClick,
    onSaveButtonClick,
  } = props;
  if (user.name !== undefined) {
    const cards = Object.keys(editFormsOpen).map(
      key => 
        !editFormsOpen[key]
          ? <FactCard 
              fact={ user[key] } 
              inFlux={ fieldsInFlux[key] }
              title={ cardTitles[key] } 
              key={ key }
              onSubmit={ () => onEditButtonClick(key) }
            />
          : <EditCard 
              fact={ user[cardTitles[key]] } 
              title={ cardTitles[key] } 
              key={ key }
              fieldName={ key }
              user={ user }
              onSubmit={ data => 
                  onSaveButtonClick(key, data[key], credentials) 
              }/>
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

