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

invitationSchema.methods.delete = function(cb) {
  this.model('Invitation').deleteOne({_id: this._id}, cb);
}

invitationSchema.methods.accept = function(cb) {
  this.accepted = true;
  this.save(err => {
    if (err)
      return cb(err);
    Relationship.findByUsers(
      this.inviter.username, 
      this.invitee.username, 
      function(err, rship) {
        if (err) 
          return cb(err);
        if (!rship) {
          rship = new Relationship({
            firstPerson: {
              id: this.inviter.id,
              username: this.inviter.username,
              canSeeInfo: true,
            },
            secondPerson: {
              id: this.invitee.id,
              username: this.invitee.username,
              canSeeInfo: this.isReciprocal,
            },
            isReciprocal: this.isReciprocal,
          });
          rship.save(cb);
        } else {
          rship.firstPerson.username === this.inviter.username
            ? rship.firstPerson.canSeeInfo = true
            : rship.secondPerson.canSeeInfo = true;
          rship.save(cb);
        }
      });
  });
};

invitationSchema.methods.reject = function(cb) {
  this.rejected = true;
  this.save(cb);
};

module.exports = mongoose.model('Invitation', invitationSchema);
