const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
require('dotenv/config');
const bodyParser = require('body-parser')

dotenv.config();

//middleware
app.use(express.json());

//Connect to DB
mongoose.connect( process.env.DB_Connect , { useNewUrlParser: true },  () => console.log('connected to DB'))

//route middleware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen( 3000 );