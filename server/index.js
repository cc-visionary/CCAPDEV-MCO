// import module `express`, `cors`, `session`, `body-parser`, `path`
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

const corsOptions = {
    origin: "http://localhost:8080"
};

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('dist'));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// define the paths contained in `./routes/routes.js`
app.use('/api/', routes);

// binds the server to a specific port
app.listen(port, () => console.log('app listening at port ' + port));