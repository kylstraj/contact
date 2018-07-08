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

const UserDisplayCard = ({ name, onShareClick, contactUsername, userUsername }) => (
  <p className='user-display-card'>
    {name} ({contactUsername})
    <button onClick={ () => onShareClick(contactUsername, userUsername) }>
      Share Your Info
    </button>
  </p>
);

const renderUserCards = (contactUsers, onShareClick, userUsername) => 
  contactUsers.map(contactUser => 
    <UserDisplayCard 
      contactUsername={contactUser.username}
      key={contactUser.username}
      name={contactUser.name} 
      userUsername={userUsername}
      onShareClick={onShareClick}
    />
  );

const UserDisplayBox = ({ contactUsers, onShareClick, userUsername }) => (
  <div>
    {renderUserCards(contactUsers, onShareClick, userUsername)}
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
      userUsername={credentials.username}
    />
  </div>
);


export default SearchUsersScreen;
