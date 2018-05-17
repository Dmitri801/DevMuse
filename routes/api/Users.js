const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');


// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// Load User Model
const User = require('../../models/User');

// @route       GET api/users/test
// @description test users route
// @access      Public
router.get('/test', (req, res) => res.json({
  msg: 'Users Works'
}));

// @route       POST api/users/register
// @description test users route
// @access      Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if(!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email })
      .then(user => {
        if(user) {
          errors.email = "Email already exists, Please sign in to continue."
          return res.status(400).json(errors);
        } else {
          const avatar = gravatar.url(req.body.email, {size: '200', r: 'pg', d: 'mm' })
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;
                newUser.save()
                     .then(user => res.json(user))
                     .catch(err => console.log(err));
            });
          });
        }
      })
})

// @route       POST api/users/login
// @description login the user returning json web token
// @access      Public
router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

    // Find the user by email
    User.findOne({email})
        .then(user => {
          if(!user) {
            errors.email = "User Not Found";
            return res.status(404).json(errors)
          }

          //Check password
          bcrypt.compare(password, user.password).then(isMatch => {
                
                if(isMatch){
                  // User Matched
                  const payload = { id: user.id, name: user.name, avatar: user.avatar} // Create JWT payload

                  // Sign token
                  jwt.sign(payload, keys.secretOrKey, { expiresIn: '24h' }, 
                  (err, token) => {
                    res.json({
                      success: true,
                      token: 'Bearer ' + token
                    })
                  });
                } else {
                  errors.password = "Password Incorrect";
                  return res.status(400).json(errors)
                }
              })
              .catch(err => console.log(err))
        })
})


// @route       GET api/users/current
// @description return whoever the token belongs too, (current user)
// @access      Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})

module.exports = router;



