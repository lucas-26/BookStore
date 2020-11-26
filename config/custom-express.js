const express = require(`express`);
const app = express();
const file_routes = require('../app/routes/file_routes');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(
    bodyParser.urlencoded({ extended: true }),
    cors()
    );
file_routes(app);

module.exports = app;
