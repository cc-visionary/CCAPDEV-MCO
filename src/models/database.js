
// import module `mongodb`
const mongodb = require('mongodb');

// MongoDB client
const client = mongodb.MongoClient;
const url = 'mongodb://localhost:27017';

// name of the database
const dbName = 'database';

// additional connection options
const options = { useUnifiedTopology: true };

const database = {

}

/*
    exports the object `database` (defined above)
    when another script exports from this file
*/
module.exports = database;