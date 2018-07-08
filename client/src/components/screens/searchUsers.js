import React from 'react';
import { Field, reduxForm } from 'redux-form';

let UsersSearchBox = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <p>
      <label htmlFor='userSearch'>Name: </label>
      <Field name='userSearch' component='input' type='text'/>
      <button type='submit'>Search</button>
    </p>
  </form>
);
  
UsersSearchBox = reduxForm({
  form: 'searchUsers'
})(UsersSearchBox);

const UserDisplayCard = ({ name, onShareClick, contactUsername, userCredentials }) => (
  <p className='user-display-card'>
    {name} ({contactUsername})
    <button onClick={ () => onShareClick(contactUsername, userCredentials) }>
      Share Your Info
    </button>
  </p>
);

const renderUserCards = (contactUsers, onShareClick, userCredentials) => 
  contactUsers.map(contactUser => 
    <UserDisplayCard 
      contactUsername={contactUser.username}
      key={contactUser.username}
      name={contactUser.name} 
      userCredentials={userCredentials}
      onShareClick={onShareClick}
    />
  );

const UserDisplayBox = ({ contactUsers, onShareClick, userCredentials }) => (
  <div>
    {renderUserCards(contactUsers, onShareClick, userCredentials)}
  </div>
);

const SearchUsersScreen = (
  { 
    credentials, 
    onSearchClick, 
    onShareClick, 
    usersFound 
  }
) => (
  <div>
    <UsersSearchBox onSubmit={ data => onSearchClick(data.userSearch, credentials) } />
    <UserDisplayBox 
      contactUsers={usersFound} 
      onShareClick={onShareClick} 
      userCredentials={credentials}
    />
  </div>
);


export default SearchUsersScreen;
