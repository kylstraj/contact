import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from '../shared/Button';
import renderTextField from '../../utils/renderTextField';

let UsersSearchBox = ({ handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field autoComplete='off' label='Name' name='userSearch' component={renderTextField} type='text'/>
      <Button color='primary' variant='contained' type='submit'>Search</Button>
    </div>
  </form>
);
  
UsersSearchBox = reduxForm({
  form: 'searchUsers'
})(UsersSearchBox);

const UserDisplayCard = 
  ({ name, onShareClick, contactUsername, userCredentials, inProgress, shared }) => (
    !inProgress && !shared
      ? (
        <div className='user-display-card'>
          {name} ({contactUsername})
          <Button 
            variant='contained'
            color='primary'
            onClick={ () => onShareClick(contactUsername, userCredentials) }
          >
            Share Your Info
          </Button>
        </div>
        )
      : inProgress
        ? (
          <div className='user-display-card'>
            {name} ({contactUsername}) Sharing your info...
          </div>
          )
        : (
          <div className='user-display-card'>
            You shared your info with {name}!
          </div>
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
