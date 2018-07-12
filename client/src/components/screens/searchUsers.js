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

const ShareOrSharedEmblem = ({ shared, onShareClick }) =>
  !shared
    ? (<Button
        variant='contained'
        color='primary'
        onClick={onShareClick}>
        Share Your Info
       </Button>)
    : (<Button
        variant='contained'
        color='primary'
        disabled={true}>
        Info Shared
      </Button>);

const RequestOrHasEmblem = ({ has }) =>
  !has
    ? (<Button
        variant='contained'
        color='primary'>
        Request Info
      </Button>)
    : (<Button
        variant='contained'
        color='primary'
        disabled={true}>
        Info Had
      </Button>);
        
     

const UserDisplayCard =
  ({ name, onShareClick, contactUsername, inProgress, sharedInfo, hasInfo }) => (
    <div className='user-display-card'>
      {name} ({contactUsername})
      <ShareOrSharedEmblem 
        shared={sharedInfo} 
        onShareClick={() => onShareClick(contactUsername)}
      />
      <RequestOrHasEmblem has={hasInfo}/>
    </div>
  );

const renderUserCards = 
  (contactUsers, onShareClick, sharesInProgress, shareResults) =>
    contactUsers.map(contactUser => 
      <UserDisplayCard 
        contactUsername={contactUser.username}
        key={contactUser.username}
        name={contactUser.name} 
        onShareClick={onShareClick}
        inProgress={sharesInProgress[contactUser.username]}
        sharedInfo={shareResults[contactUser.username]}
        hasInfo={contactUser.hasInfo}
      />
    );

const UserDisplayBox = 
  ({ contactUsers, onShareClick, sharesInProgress, shareResults }) => (
    <div>
      {renderUserCards(contactUsers, onShareClick, sharesInProgress, shareResults)}
    </div>
  );

const SearchUsersScreen = (
  { 
    contacts,
    onSearchClick, 
    onShareClick, 
    sharesInProgress,
    shareResults,
    usersFound 
  }
) => (
  <div>
    <UsersSearchBox onSubmit={ data => onSearchClick(data.userSearch, contacts) } />
    <UserDisplayBox 
      contactUsers={usersFound} 
      onShareClick={onShareClick} 
      sharesInProgress={sharesInProgress}
      shareResults={shareResults}
    />
  </div>
);


export default SearchUsersScreen;
