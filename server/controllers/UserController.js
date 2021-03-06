// import module from `../models/database.js`
const db = require('../models/database.js');

// import UserSchema from `../models/UserModel.js`
const User = require('../models/UserModel');

// import module `validationResult` from `express-validator`
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync();

const defaultCallback = (res, result) => res.status(200).json(result)

const UserController = {
  getAllUsers: (req, res) => {
    db.findMany(User, {}, (result) => defaultCallback(res, result));
  },
  addUser: (req, res) => {
    const user = {
      userId: req.body.userId,
      avatar: req.body.avatar,
      fullname: req.body.fullname,
      username: req.body.username,
      birthday: req.body.birthday,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, saltRounds),
      userType: req.body.userType,
    };

    db.insertOne(User, user, (result) => {
      if(result) {
        res.status(200).json({ success: true })
      } else {
        res.json({ success: false, errorMessage: 'Failed to add user...' })
      }
    });
  },
  updateUser: (req, res) => {
    // checks if there are validation errors
    var errors = validationResult(req);

    // if there are validation errors
    if (errors.isEmpty()) {
      const user = {
        userId: req.body.userId,
        avatar: req.body.avatar,
        fullname: req.body.fullname,
        username: req.body.username,
        birthday: req.body.birthday,
        email: req.body.email,
        userType: req.body.userType,
      };
  
      db.updateOne(User, { userId : req.body.userId }, user, (result) => {
        if(result) {
          res.status(200).json({ success: true })
        } else {
          res.json({ success: false, errorMessage: 'Failed to update profile...' })
        }
      });
    }
  },
  deleteUser: (req, res) => {
    db.deleteOne(User, { userId: parseInt(req.params.userId) }, (result) => {
      if(result) {
        res.status(200).json({ success: true })
      } else {
        res.json({ success: false, errorMessage: 'Failed to delete profile...' })
      }
    });
  },
  getLogin: (req, res) => {
    if(req.session.userId) {
      const user = {
        userId: req.session.userId, 
        avatar: req.session.avatar,
        username: req.session.username,
        fullname: req.session.fullname,
        email: req.session.email,
        birthday: req.session.birthday,
        userType: req.session.userType
      };
      res.status(200).json({ success: true, user });
    } else {
      res.json({ success: false });
    }
  },
  login: (req, res) => {
    // checks if there are validation errors
    var errors = validationResult(req);

    if(errors.isEmpty()) {
      const { username, password, remember } = req.body;

      db.findOne(User, { username }, (result) => {
        if(result) {
          
          if(bcrypt.compareSync(password, result.password)) {
            // only keep the user logged in, if user asked to be `remember` is true
            if(remember) {
              req.session.userId = result.userId;
              req.session.avatar = result.avatar;
              req.session.username = result.username;
              req.session.fullname = result.fullname;
              req.session.email = result.email;
              req.session.birthday = result.birthday;
              req.session.userType = result.userType;
            }
            res.status(200).json({success: true, user : result})
          } else {
            res.json({success: false, errorMessage: 'Incorrect password...'})
          }
        } else {
          res.json({success: false, errorMessage: 'Username doesn\'t exist...'})
        }
      })
    }
  },
  logout: (req, res) => {
    req.session.destroy((err) => {
      if(err) {
        res.json({ success: false });
        throw err;
      }

      res.json({ success: true });
  });
  },
  verifyPassword: (req, res) => {
    // checks if there are validation errors
    var errors = validationResult(req);

    if(errors.isEmpty()) {
      const { username, password } = req.query;

      db.findOne(User, { username }, (result) => {
        if(bcrypt.compareSync(password, result.password)) {
          res.status(200).json({success: true})
        } else res.status(200).json({success: false})
      })
    }
  }
};
/*
    exports the object `UserController` (defined above)
    when another script exports from this file
*/
module.exports = UserController;