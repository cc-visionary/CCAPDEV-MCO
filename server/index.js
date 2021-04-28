// import module `express`, `cors`, `session`, `body-parser`, `path`
const express = require('express');
const session = require('express-session');
fileUpload = require('express-fileupload');
const cors = require('cors');
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
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// define the paths contained in `./routes/routes.js`
app.use('/api/', routes);

// binds the server to a specific port
app.listen(port, () => console.log('app listening at port ' + port));