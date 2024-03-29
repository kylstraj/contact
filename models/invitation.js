const mongoose = require('mongoose');
const User = require('./user');
const Relationship = require('./relationship');

var invitationSchema = mongoose.Schema({
  inviter: {
    username: {
      required: true,
      type: String,
      maxLength: 20,
    },
    id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  invitee: {
    username: {
      required: true,
      type: String,
      maxLength: 20,
    },
    id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  isReciprocal: {
    required: true,
    type: Boolean,
  },
  accepted: {
    required: true,
    type: Boolean,
  },
  rejected: {
    required: true,
    type: Boolean,
  },
});

invitationSchema.pre('save', function(next) {
  const { inviter, invitee } = this;
  const inviterUid = inviter.id;
  const inviteeUid = invitee.id;
  const id = this._id;
  User.findByIdAndUpdate(
    inviterUid,
    {$push: {'invitations.made': id}},
    function (err, inviter) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (inviter) {
        User.findByIdAndUpdate(
          inviteeUid,
          {$push: {'invitations.received': id}},
          function (err, invitee) {
            if (err) {
              console.error(err);
              return next(err);
            }
            if (invitee) {
              return next(null);
            } else {
              return next(new Error(`Couldn't find user ${invitee.username}`));
            }
          });
      } else {
        return next(new Error(`Couldn't find user ${inviter.username}`));
      }
    });
});

invitationSchema.pre('remove', function(next) {
  const { inviter, invitee } = this;
  const inviterUid = inviter.id;
  const inviteeUid = invitee.id;
  const id = this._id;
  User.findByIdAndUpdate(
    inviterUid,
    {$pull: {'invitations.made': id}},
    function (err, inviter) {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (inviter) {
        User.findByIdAndUpdate(
          inviteeUid,
          {$pull: {'invitations.received': id}},
          function (err, invitee) {
            if (err) {
              console.error(err);
              return next(err);
            }
            if (invitee) {
              return next(null);
            } else {
              return next(new Error(`Couldn't find user ${invitee.username}`));
            }
          });
      } else {
        return next(new Error(`Couldn't find user ${inviter.username}`));
      }
    });
});

invitationSchema.methods.accept = function(cb) {
  inv = this;
  inv.accepted = true;
  inv.remove((err, inv) => {
    if (err)
      return cb(err);
    Relationship.findByUsers(
      inv.inviter.username, 
      inv.invitee.username, 
      function(err, rship) {
        if (err) 
          return cb(err);
        if (!rship) {
          rship = new Relationship({
            firstPerson: {
              id: inv.inviter.id,
              username: inv.inviter.username,
              canSeeInfo: true,
            },
            secondPerson: {
              id: inv.invitee.id,
              username: inv.invitee.username,
              canSeeInfo: inv.isReciprocal,
            },
            isReciprocal: inv.isReciprocal,
          });
          rship.save(cb);
        } else {
          console.log(`rship: ${rship}`);
          console.log(`inv.inviter: ${inv.inviter}`);
          rship.firstPerson.username === inv.inviter.username
            ? rship.firstPerson.canSeeInfo = true
            : rship.secondPerson.canSeeInfo = true;
          rship.save(cb);
        }
      });
  });
};

invitationSchema.methods.reject = function(cb) {
  this.rejected = true;
  this.remove(cb);
};

module.exports = mongoose.model('Invitation', invitationSchema);
