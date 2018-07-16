import { connect } from 'react-redux';
import apiFetch from '../utils/apiFetch';
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
      apiFetch(`/api/user/accept?inviter=${inviter}`)
        .then(() => dispatch(invitationAccepted(inviter)));
    },
    rejectInvitation: inviter => {
      dispatch(startRespondToInvitation(inviter));
      apiFetch(`/api/user/reject?inviter=${inviter}`)
        .then(() => dispatch(invitationRejected(inviter)));
    },
  }
);

const InvitationScreenContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InvitationScreen);

export default InvitationScreenContainer;
