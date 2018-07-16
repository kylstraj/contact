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

const RequestRequestedOrHasEmblem = ({ requested, has, onRequestClick }) =>
  has
    ? (<Button
        variant='contained'
        color='primary'
        disabled={true}>
        Info Had
      </Button>)
    : requested
      ? (<Button
          variant='contained'
          color='primary'
          disabled={true}>
          Info Requested
        </Button>)
      : (<Button
          variant='contained'
          color='primary'
          onClick={onRequestClick}>
          Request Info
        </Button>);

const UserDisplayCard =
  ({ 
    name, 
    onShareClick, 
    onRequestClick, 
    contactUsername, 
    inProgress, 
    sharedInfo, 
    hasInfo, 
    requestedInfo
  }) => (
    <div className='user-display-card'>
      {name} ({contactUsername})
      <ShareOrSharedEmblem 
        shared={sharedInfo} 
        onShareClick={() => onShareClick(contactUsername)}
      />
      <RequestRequestedOrHasEmblem 
        has={hasInfo} 
        requested={requestedInfo}
        onRequestClick={() => onRequestClick(contactUsername)}
      />
    </div>
  );

const renderUserCards = 
  (contactUsers, onShareClick, onRequestClick, sharesInProgress, shareResults, requestsMade) =>
    contactUsers.map(contactUser => 
      <UserDisplayCard 
        contactUsername={contactUser.username}
        key={contactUser.username}
        name={contactUser.name} 
        onShareClick={onShareClick}
        onRequestClick={onRequestClick}
        inProgress={sharesInProgress[contactUser.username]}
        sharedInfo={shareResults[contactUser.username]}
        hasInfo={contactUser.hasInfo}
        requestedInfo={requestsMade[contactUser.username]}
      />
    );

const UserDisplayBox = 
  ({ 
    contactUsers, 
    onRequestClick,
    onShareClick, 
    sharesInProgress, 
    shareResults, 
    requestsMade, 
  }) => (
    <div>
      {renderUserCards(
        contactUsers, 
        onShareClick, 
        onRequestClick, 
        sharesInProgress, 
        shareResults, 
        requestsMade
      )}
    </div>
  );

const SearchUsersScreen = (
  { 
    contacts,
    onRequestClick,
    onSearchClick, 
    onShareClick, 
    requestsMade,
    sharesInProgress,
    shareResults,
    usersFound 
  }
) => (
  <div>
    <UsersSearchBox onSubmit={ data => onSearchClick(data.userSearch, contacts) } />
    <UserDisplayBox 
      contactUsers={usersFound} 
      onRequestClick={onRequestClick}
      onShareClick={onShareClick} 
      requestsMade={requestsMade}
      sharesInProgress={sharesInProgress}
      shareResults={shareResults}
    />
  </div>
);


export default SearchUsersScreen;
