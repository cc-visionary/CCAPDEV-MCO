// import module `mongoose`
const mongoose = require('mongoose');

const { Schema } = mongoose;

// defines the schema for collection `users`
const UserSchema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  }
});

/*
  exports a mongoose.model object based on `UserSchema` (defined above)
  when another script exports from this file
  This model executes CRUD operations
  to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('User', UserSchema);