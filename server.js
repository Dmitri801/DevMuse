const express = require('express');
    
const users = require('./routes/api/Users.js');
const profile = require('./routes/api/Profile.js');
const posts = require('./routes/api/Posts.js');
const mongoose = require('mongoose');

const app = express();
// DB Config
const db = require('./config/keys').mongoURI;

// Connect to Mongo DB
mongoose.connect(db)
        .then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Home'));

// Use Routes Folder
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server up on port: ${port}`);
})


