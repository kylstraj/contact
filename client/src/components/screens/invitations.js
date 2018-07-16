import React from 'react';
import Button from '@material-ui/core/Button';

const InvitationCard = ({inviterName, inviterUsername, acceptInvitation, rejectInvitation}) => (
  <div>
    {inviterName} ({inviterUsername})
    <Button color='primary' variant='contained' onClick={() => acceptInvitation(inviterUsername)}>
      Share your info
    </Button>
    <Button color='secondary' variant='contained' onClick={() => rejectInvitation(inviterUsername)}>
      Reject request
    </Button>
  </div>
);

const InvitationScreen = ({invitations, acceptInvitation, rejectInvitation}) => (
  <div>
    <h2>Invitations you received</h2>
    {invitations.received.map((inv, idx) => 
      (<InvitationCard 
        key={idx}
        inviterName={inv.inviter.name} 
        inviterUsername={inv.inviter.username}
        acceptInvitation={acceptInvitation}
        rejectInvitation={rejectInvitation}/>))}
    <h2>Invitations you made</h2>
    {invitations.made.map((inv, idx) => (<p key={idx}>{inv.invitee.username}</p>))}
  </div>
);

export default InvitationScreen;
