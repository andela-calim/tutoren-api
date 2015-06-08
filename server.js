// ---------------------
// Required modules
// =====================
require('dotenv').load();

var express       = require('express'),
    morgan        = require('morgan'),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    flash         = require('connect-flash'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session'),

// ---------------------
// Instantiate tutApp
// =====================
    tutApp        = express(),

// ---------------------
// Set port
// =====================
    port          = process.env.PORT || 3000,

// ---------------------
// Required scripts
// =====================
    config        = require('./config/database.config'),
    tutRoute      = require('./routes/main.routes');

// ---------------------
// Configurations...
// =====================
mongoose.connect(config.DBUrl);
require('./config/passport.config')(passport); // pass passport for configuration

// ---------------------
// Use...
// =====================
tutApp.use(bodyParser.urlencoded({ extended: true }));
tutApp.use(bodyParser.json());
tutApp.use(morgan('dev'));
tutApp.use(cookieParser()); // read cookies (needed for auth)

tutApp.use(session(config));
tutApp.use(passport.initialize());
tutApp.use(passport.session()); // persistent login sessions
tutApp.use(flash()); // use connect-flash for flash messages

// ---------------------
// Load routes, passing in tutApp and fully configured passport
// =====================
tutRoute(tutApp, passport);

// ---------------------
// Start Server
// =====================
tutApp.listen(port);