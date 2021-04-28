
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
   /* creates database */
  createDatabase: () => {
    client.connect(url, options, (err, db) => {
      if(err) throw err;
      console.log('Database created!');
      db.close();
    });
  },
  /* creates collection `collection` */
  createCollection: (collection) => {
    client.connect(url, options, (err, db) => {
        if(err) throw err;
        var database = db.db(dbName);
        database.createCollection(collection, (err, res) => {
          if(err) throw err;
          console.log('Collection ' + collection + ' created');
          db.close();
        });
    });
  },
  /* inserts document `doc` to collection `collection` */
  insertOne: (collection, doc) => {
    client.connect(url, options, (err, db) => {
        if(err) throw err;
        var database = db.db(dbName);
        database.collection(collection).insertOne(doc, (err, res) => {
          if(err) throw err;
          console.log('1 document inserted');
          db.close();
        });
    });
  },
  /* inserts array of documents `docs` to collection `collection` */
  insertMany: (collection, docs) => {
    client.connect(url, options, (err, db) => {
        if(err) throw err;
        var database = db.db(dbName);
        database.collection(collection).insertMany(docs, (err, res) => {
          if(err) throw err;
          console.log('Documents inserted: ' + res.insertedCount);
          db.close();
        });
    });
  },
  /* 
    searches for a single document in the collection `collection` based on the contents of object `query` 
    callback function is called when the database has finished the execution of findOne() function
  */
  findOne: (collection, query, callback) => {
    client.connect(url, options, (err, db) => {
      if(err) throw err;
      var database = db.db(dbName);
      database.collection(collection).findOne(query, (err, result) => {
        if(err) throw err;
        db.close();
        return callback(result);
      });
    });
  },
  /* 
    searches for multiple documents in the collection `collection` based on the contents of object `query`
    callback function is called when the database has finished the execution of findMany() function
  */
  findMany: (collection, query, callback, sort=null, projection=null) => {
    client.connect(url, options, (err, db) => {
      if(err) throw err;
      var database = db.db(dbName);
      database.collection(collection).find(query, {projection: projection}).sort(sort).toArray((err, result) => {
        if(err) throw err;
        db.close();
        return callback(result);
      });
    });
  },
  /* deletes a single document in the collection `collection` based on the object `filter` */
  deleteOne: (collection, filter) => {
    client.connect(url, options, (err, db) => {
      if(err) throw err;
      var database = db.db(dbName);
      database.collection(collection).deleteOne(filter, (err, res) => {
        if(err) throw err;
        console.log('1 document deleted');
        db.close();
      });
    });
  },
  /* deletes multiple documents in the collection `collection` based on the object `filter` */
  deleteMany: (collection, filter) => {
    client.connect(url, options, (err, db) => {
        if(err) throw err;
        var database = db.db(dbName);
        database.collection(collection).deleteMany(filter, (err, res) => {
            if(err) throw err;
            console.log('Documents deleted: ' + res.deletedCount);
            db.close();
        });
    });
  },
  /* drops the collection `collection` */
  dropCollection: (collection) => {
    client.connect(url, options, (err, db) => {
      if(err) throw err;
      var database = db.db(dbName);
      database.collection(collection).drop((err, res) => {
        if(err) throw err;
        console.log('Collection ' + collection + ' deleted');
        db.close();
      });
    });
  },
  /* 
    updates the value defined in the object `update` on a single document 
    in the collection `collection` based on the object `filter`
  */
  updateOne: (collection, filter, update) => {
    client.connect(url, options, (err, db) => {
      if(err) throw err;
      var database = db.db(dbName);
      database.collection(collection).updateOne(filter, update, (err, res) => {
        if(err) throw err;
        console.log('1 document updated');
        db.close();
      });
    });
  },
  /* 
    updates the value defined in the object `update` on multiple documents 
    in the collection `collection` based on the object `filter`
  */
  updateMany: (collection, filter, update) => {
    client.connect(url, options, (err, db) => {
      if(err) throw err;
      var database = db.db(dbName);
      database.collection(collection).updateMany(filter, update, (err, res) => {
        if(err) throw err;
        console.log('Documents updated: ' + res.modifiedCount);
        db.close();
      });
    });
  }
}

/*
    exports the object `database` (defined above)
    when another script exports from this file
*/
module.exports = database;