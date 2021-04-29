// import module from `../models/database.js`
const db = require('../models/database.js');

// import UserSchema from `../models/UserModel.js`
const User = require('../models/UserModel');

const bcrypt = require('bcrypt');
const saltRounds = 10;


const defaultCallback = (res, result) => res.status(200).json(result)

const UserController = {
  getAllUsers: (req, res) => {
    db.findMany(User, {}, (result) => defaultCallback(res, result));
  },
  addUser: (req, res) => {
    bcrypt(req.body['password'], saltRounds, (err, hash) => {
      const user = {
        userId: req.body.userId,
        avatar: req.body.avatar,
        fullname: req.body.fullname,
        username: req.body.username,
        birthday: req.body.birthday,
        email: req.body.email,
        password: hash,
        userType: req.body.userType,
        loggedIn: req.body.loggedIn,
      };

      db.insertOne(User, user, (result) => defaultCallback(res, result));
    });
  },
  updateUser: (req, res) => {
    bcrypt(req.body['password'], saltRounds, (err, hash) => {
      const user = {
        userId: req.body.userId,
        avatar: req.body.avatar,
        fullname: req.body.fullname,
        username: req.body.username,
        birthday: req.body.birthday,
        email: req.body.email,
        password: hash,
        userType: req.body.userType,
        loggedIn: req.body.loggedIn,
      };

      db.updateOne(User, { userId : req.body.userId }, user, (result) => defaultCallback(res, result));
    });
  },
  login: (req, res) => {
    const { username, password, rememberMe } = req.body; 

    db.findOne(User, { username }, (result) => {
      if(result) {

      } else {
        
      }
      
      console.log(result);
    })
  }
};
/*
    exports the object `UserController` (defined above)
    when another script exports from this file
*/
module.exports = UserController;