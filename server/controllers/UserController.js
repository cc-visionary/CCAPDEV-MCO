// import module from `../models/database.js`
const db = require('../models/database.js');

const collection = 'users';

const UserController = {
  getAllUsers: (req, res) => {
    db.findMany(collection, {}, (result) => res.status(200).json(result));
  },
  addUser: (req, res) => {
    db.insertOne(collection, req)
  },
};
/*
    exports the object `UserController` (defined above)
    when another script exports from this file
*/
module.exports = UserController;