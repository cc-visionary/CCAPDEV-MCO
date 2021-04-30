/* 
  Sets up the session and connection to backend, then listens to those connection.
*/

// import module `express`, `cors`, `session`, `cors`, `connect-mongo`, `body-parser`, `path`
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

const User = require('./models/UserModel');

const db = require('./models/database');

const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/tech-titan';

const corsOptions = {
    origin: "http://localhost:8080",
    credentials: true
};

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('dist'));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static(path.resolve(__dirname, '../dist')));

// connects to the database
db.connect();

app.use(session({
    secret: 'techtitan-session',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection : mongoose.connection }),
    autoRemove: 'disabled'
}));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
});

// binds the server to a specific port
app.listen(port, () => console.log('app listening at port ' + port));