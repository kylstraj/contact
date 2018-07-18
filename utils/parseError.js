const fieldMessageMap = {
  fullName: {
    maxlength: 'Your name must be at most 255 characters',
    required: 'You must provide your name',
  },
  email: {
    maxlength: 'Your email address must be at most 255 characters',
  },
  phone: {
    maxlength: 'Your phone number must be at most 255 characters',
  },
  address: {
    maxlength: 'Your address must be at most 255 characters',
  },
};

module.exports = err => ({
  errors: Object.keys(err.errors).map(key =>
    fieldMessageMap[err.errors[key].path][err.errors[key].kind]),
});
