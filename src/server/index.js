'use strict';

const express = require('express');
var db = require("./database.js")
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
var passport = require('passport');
require('./pass.js')
var SQLiteStore = require('connect-sqlite3')(session);

var coursesRouter = require('./routes/courses')
var authRouter = require('./routes/auth')
var planRouter = require('./routes/plan')




//init db
async function db_init() {
  await db.open();
  await db.init();
}

db_init();

// init express
const app = new express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session used by passport for auth
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));
app.use(passport.authenticate('session'));
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);


app.use('/api/courses', coursesRouter)
app.use('/api/', authRouter)
app.use('/api/plan', planRouter)

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});