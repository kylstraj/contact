import React from 'react';

const InvitationScreen = ({invitations, acceptInvitation, rejectInvitation}) => (
  <div>
    <h2>Invitations you received</h2>
    {invitations.received.map((inv, idx) => (<p key={idx}>{inv.inviter.username}</p>))}
    <h2>Invitations you made</h2>
    {invitations.made.map((inv, idx) => (<p key={idx}>{inv.invitee.username}</p>))}
  </div>
);

export default InvitationScreen;
