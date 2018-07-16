import { connect } from 'react-redux';
import InvitationScreen from '../components/screens/invitations';
import {
  startRespondToInvitation,
  invitationAccepted,
  invitationRejected,
} from '../actions/actions';

const mapStateToProps = state => (
  {
    invitations: state.invitations.invitations,
  }
);

const mapDispatchToProps = dispatch => (
  {
    acceptInvitation: inviter => {
      dispatch(startRespondToInvitation(inviter));
      fetch(`/api/user/accept?inviter=${inviter}`,
        {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .then(res => dispatch(invitationAccepted(inviter)));
    },
    rejectInvitation: inviter => {
      dispatch(startRespondToInvitation(inviter));
      fetch(`/api/user/reject?inviter=${inviter}`,
        {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then(res => res.json())
        .then(res => dispatch(invitationRejected(inviter)));
    },
  }
);

const InvitationScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvitationScreen);

export default InvitationScreenContainer;
