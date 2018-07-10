import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '@material-ui/core/Button';

let UsersSearchBox = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <p>
      <label htmlFor='userSearch'>Name: </label>
      <Field name='userSearch' component='input' type='text'/>
      <Button color='primary' variant='contained' type='submit'>Search</Button>
    </p>
  </form>
);
  
UsersSearchBox = reduxForm({
  form: 'searchUsers'
})(UsersSearchBox);

const UserDisplayCard = 
  ({ name, onShareClick, contactUsername, userCredentials, inProgress, shared }) => (
    !inProgress && !shared
      ? (
        <p className='user-display-card'>
          {name} ({contactUsername})
          <Button 
            variant='contained'
            color='primary'
            onClick={ () => onShareClick(contactUsername, userCredentials) }
          >
            Share Your Info
          </Button>
        </p>
        )
      : inProgress
        ? (
          <p className='user-display-card'>
            {name} ({contactUsername}) Sharing your info...
          </p>
          )
        : (
          <p className='user-display-card'>
            You shared your info with {name}!
          </p>
          )
  );

const renderUserCards = 
  (contactUsers, onShareClick, sharesInProgress, shareResults, userCredentials) =>
    contactUsers.map(contactUser => 
      <UserDisplayCard 
        contactUsername={contactUser.username}
        key={contactUser.username}
        name={contactUser.name} 
        userCredentials={userCredentials}
        onShareClick={onShareClick}
        inProgress={sharesInProgress[contactUser.username]}
        shared={shareResults[contactUser.username]}
      />
    );

const UserDisplayBox = 
  ({ contactUsers, onShareClick, sharesInProgress, shareResults, userCredentials }) => (
    <div>
      {renderUserCards(contactUsers, onShareClick, sharesInProgress, shareResults,userCredentials)}
    </div>
  );

const SearchUsersScreen = (
  { 
    credentials, 
    onSearchClick, 
    onShareClick, 
    sharesInProgress,
    shareResults,
    usersFound 
  }
) => (
  <div>
    <UsersSearchBox onSubmit={ data => onSearchClick(data.userSearch, credentials) } />
    <UserDisplayBox 
      contactUsers={usersFound} 
      onShareClick={onShareClick} 
      sharesInProgress={sharesInProgress}
      shareResults={shareResults}
      userCredentials={credentials}
    />
  </div>
);


export default SearchUsersScreen;
