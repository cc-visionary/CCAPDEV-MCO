
// import module `mongoose`
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/tech-titan';

// name of the database
const dbName = 'tech-titan';

// additional connection options
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

const database = {
  /*
    connects to database
  */
  connect: () => {
    mongoose.connect(url, options, (err) => {
      if(err) throw err;
      console.log('Connected to ' + url)
    });
  },
  dropCollection: (collection, callback) => {
    mongoose.connection.dropCollection(collection, (error, result) => {
      if(error) return false;
      console.log('Dropped ' + collection + ' collection');
      return callback(result);
    })
  },
  /* inserts a single `doc` to the database based on the model `model` */
  insertOne: (model, doc, callback) => {
    model.create(doc, (error, result) => {
      console.log(error)
      if(error) return false;
      console.log('Added 1 document to ' + model.collection.name + ' collection ');
      return callback(result);
    });
  },
  /* inserts array of documents `docs` to model `model` */
  insertMany: (model, docs, callback) => {
    model.insertMany(docs, (error, result) => {
      if(error) return false;
      console.log('Added ' + result.length + ' documents to ' + model.collection.name + ' collection ');
      return callback(result);
    });
  },
  /* 
    searches for a single document in the model `model` based on the contents of object `query` 
    callback function is called when the database has finished the execution of findOne() function
  */
  findOne: (model, query, callback, projection=null) => {
    model.findOne(query, projection, (error, result) => {
      if(error) return false;
      console.log('Requested 1 data from ' + model.collection.name + ' collection ');
      return callback(result);
  });
  },
  /* 
    searches for multiple documents in the model `model` based on the contents of object `query`
    callback function is called when the database has finished the execution of findMany() function
  */
  findMany: (model, query, callback, sort=null, projection=null) => {
    model.find(query, projection, sort, (error, result) => {
      if(error) return false;
      console.log('Requested ' + result.length + ' data from ' + model.collection.name + ' collection ');
      return callback(result);
  });
  },
  /* deletes a single document in the model `model` based on the object `conditions` */
  deleteOne: (model, conditions, callback) => {
    model.deleteOne(conditions, (error, result) => {
      if(error) return false;
      console.log('Deleted 1 document from ' + model.collection.name + ' collection ');
      return callback(result);
  });
  },
  /* deletes multiple documents in the model `model` based on the object `conditions` */
  deleteMany: (model, conditions, callback) => {
    model.deleteMany(conditions, (error, result) => {
      if(error) return false;
      console.log('Deleted ' + result.deletedCount + ' documents from ' + model.collection.name + ' collection ');
      return callback(result);
  });
  },
  /*
    updates the value defined in the object `update` on a single document 
    based on the model `model` filtered by the object `filter`
  */
  updateOne: (model, filter, update, callback) => {
    model.updateOne(filter, update, (error, result) => {
      if(error) return false;
      console.log('Updated 1 document from ' + model.collection.name + ' collection ');
      return callback(result);
    });
  },
  /* 
    updates the value defined in the object `update` on multiple documents 
    in the model `model` based on the object `filter`
  */
  updateMany: (model, filter, update, callback) => {
    model.updateMany(filter, update, (error, result) => {
      if(error) return false;
      console.log('Updated ' + result.nModified + ' documents from ' + model.collection.name + ' collection ');
      return callback(result);
    });
  }
}

/*
    exports the object `database` (defined above)
    when another script exports from this file
*/
module.exports = database;