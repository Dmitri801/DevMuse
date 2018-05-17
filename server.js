const express = require('express');
    
const users = require('./routes/api/users.js');
const profile = require('./routes/api/profile.js');
const posts = require('./routes/api/posts.js');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

// Body Parser Middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo DB
mongoose.connect(db)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

// PASSPORT MIDDDLEWARE
app.use(passport.initialize());

// passport config 
require('./config/passport.js')(passport);

// Use Routes Folder
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server up on port: ${port}`);
})


