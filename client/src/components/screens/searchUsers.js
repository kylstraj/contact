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

const UserDisplayCard = ({ name, username }) => (
  <p className='user-display-card'>{name} ({username})</p>
);

const renderUserCards = users => 
  users.map(user => 
    <UserDisplayCard name={user.name} username={user.username} key={user.username}/>
  );

const UserDisplayBox = ({ users }) => (
  <div>
    {renderUserCards(users)}
  </div>
);

const SearchUsersScreen = ({ onSearchClick, usersFound }) => (
  <div>
    <UsersSearchBox onSubmit={ data => onSearchClick(data.userSearch) } />
    <UserDisplayBox users={usersFound} />
  </div>
);


export default SearchUsersScreen;
