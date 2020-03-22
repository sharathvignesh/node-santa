// server.js
// where your node app starts

// init project
require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');

app.use(bodyParser());
app.use(morgan());
app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());

app.set("view engine","jade")

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// api router
const apiRoutes = require('./routes/api');

app.use('/message', apiRoutes);

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.render('index');
});

app.get('/success', (request, response) => {
  response.render('success', { message: request.flash('success') });
});

app.get('/error', (request, response) => {
  response.render('error', { message: request.flash('error') });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
