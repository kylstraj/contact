import apiFetch from '../utils/apiFetch';
import {
  contactsFetched,
  invitationsFetched,
  startFetchContacts,
  startFetchInvitations,
} from './actions';

export const updateContacts = dispatch => {
  dispatch(startFetchContacts());
  apiFetch('/api/user/contacts/verbose')
    .then(data => dispatch(contactsFetched(data.contacts, data.sharees)));
};

export const updateInvitations = dispatch => {
  dispatch(startFetchInvitations());
  apiFetch('/api/user/invitations')
    .then(invs => dispatch(invitationsFetched(invs)));
};
