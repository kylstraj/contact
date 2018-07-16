const mongoose = require('mongoose');
const User = require('./user');

var relationshipSchema = mongoose.Schema({
  firstPerson: {
    id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    username: {
      required: true,
      type: String,
      maxLength: 20,
    },
    canSeeInfo: {
      required: true,
      type: Boolean,
    },
  },
  secondPerson: {
    id: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    username: {
      required: true,
      type: String,
      maxLength: 20,
    },
    canSeeInfo: {
      required: true,
      type: Boolean,
    },
  },
  isReciprocal: {
    required: true,
    type: Boolean,
  },
});

relationshipSchema.pre('save', function(next) {
  const { firstPerson, secondPerson } = this;
  const uidOne = firstPerson.id;
  const uidTwo = secondPerson.id;
  const rshipId = this._id;
  User.findByIdAndUpdate(
    uidOne,
    {$push: {relationships: rshipId}},
    (err, first) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (first) {
        User.findByIdAndUpdate(
          uidTwo,
          {$push: {relationships: rshipId}},
          (err, second) => {
            if (err) {
              console.error(err);
              return next(err);
            }
            if (second) {
              return next(null);
            } else {
              return next(new Error(`Couldn't find user with id ${uidTwo}`));
            }
          },
        );
      } else {
        return next(new Error(`Couldn't find user with id ${uidOne}`));
      }
    },
  );
});

relationshipSchema.pre('remove', function(next) {
  const { firstPerson, secondPerson } = this;
  const uidOne = firstPerson.id;
  const uidTwo = secondPerson.id;
  const rshipId = this._id;
  User.findByIdAndUpdate(
    uidOne,
    {$pull: {relationships: rshipId}},
    (err, first) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (first) {
        User.findByIdAndUpdate(
          uidTwo,
          {$pull: {relationships: rshipId}},
          (err, second) => {
            if (err) {
              console.error(err);
              return next(err);
            }
            if (second) {
              return next(null);
            } else {
              return next(new Error(`Couldn't find user with id ${uidTwo}`));
            }
          },
        );
      } else {
        return next(new Error(`Couldn't find user with id ${uidOne}`));
      }
    },
  );
});


relationshipSchema.statics.findByUsers = function (unA, unB, cb) {
  return this.findOne(
    {$or: [
      {'firstPerson.username': unA, 'secondPerson.username': unB},
      {'firstPerson.username': unB, 'secondPerson.username': unA},
    ]},
    cb
  );
};

relationshipSchema.methods.findOtherUsername = function (username) {
  if (this.firstPerson.username === username) 
    return this.secondPerson.username;
  else if (this.secondPerson.username === username)
    return this.firstPerson.username;
  else
    return new Error(`${username} is not a member of relationship.`);
};

relationshipSchema.methods.canSeeOther = function (username) {
  if (this.firstPerson.username === username)
    return this.firstPerson.canSeeInfo;
  else if (this.secondPerson.username === username)
    return this.secondPerson.canSeeInfo;
  else
    return new Error(`${username} is not a member of relationship.`);
};

relationshipSchema.methods.canBeSeenByOther = function (username) {
  if (this.firstPerson.username === username)
    return this.secondPerson.canSeeInfo;
  else if (this.secondPerson.username === username)
    return this.firstPerson.canSeeInfo;
  else
    return new Error(`${username} is not a member of relationship.`);
};

module.exports = mongoose.model("Relationship", relationshipSchema);
