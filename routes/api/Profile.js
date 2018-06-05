const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require("../../validation/education");

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Profile
const User = require('../../models/User');

// @route       GET api/profile/test
// @description test profile route
// @access      Public
router.get("/test", (req, res) =>
  res.json({
    msg: "Profile Works"
  })
);

// @route       GET api/profile
// @description Get current users profile
// @access      Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if(!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
});


// @route       GET api/profile/all
// @description Get All Profiles
// @access      Public
router.get('/all', (req, res) => {
  const errors = {};
  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles to display..";
        return res.status(404).json(errors);
      } else {
        res.json(profiles);
      }
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user.." })
    );
})

// @route       GET api/profile/handle/:handle
// @description Get Profile By Handle
// @access      Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({ handle: req.params.handle })
          .populate('user', ['name', 'avatar'])
          .then(profile => {
            if(!profile) {
              errors.noprofile = "There is no profile for this user"
              res.status(404).json(errors)
            }
            res.json(profile)
          })
          .catch(err => res.status(404).json(err));
});

// @route       GET api/profile/user/:user_id
// @description Get Profile By User Id
// @access      Public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
          .populate('user', ['name', 'avatar'])
          .then(profile => {
            if(!profile) {
              errors.noprofile = "There is no profile for this user"
              res.status(404).json(errors)
            }
            res.json(profile)
          })
          .catch(err => res.status(404).json({profile: 'There is no profile for this user..'}));
});



// @route       POST api/profile
// @description Create Or Edit User Profile
// @access      Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check Validation
    if(!isValid) {
      // Return any errors
      return res.status(400).json(errors);
    }
  // Get Fields // Here we are retrieving the fields from this POST request that are sent to our Profile Model db *see models/Profile*
  const profileFields = {}; 
 profileFields.user = req.user.id
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
    if(typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',')
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.soundcloud) profileFields.social.soundcloud = req.body.soundcloud; 
    //UPDATE 
    Profile.findOne({ user: req.user.id })
        .then(profile => {
          if(profile) {
            Profile.findOneAndUpdate({ user: req.user.id }, 
                                     { $set: profileFields }, 
                                     {new: true})
                                     .then(profile => res.json(profile));
          } else {
            //Make sure handle doesnt exist already
            Profile.findOne({ handle: profileFields.handle })
                  .then(profile => {
                    // if it does 
                    if(profile) {
                      errors.handle = 'That Handle Already Exists';
                      res.status(400).json(errors);
                    }
                // if it doesnt Continue -- save the new profile
                      new Profile(profileFields).save().then(profile => res.json(profile)).catch(err => console.log(err))
                  })
            }
        })
});



// @route       POST api/profile/experience
// @description Add Experience to profile 
// @access      Private

router.post('/experience', passport.authenticate('jwt', { session: false}), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id }) 
        .then(profile => {
          const newExp = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          }

          // Add To Experience Array
          profile.experience.unshift(newExp);

          profile.save()
              .then(profile => res.json(profile))
        })
})

// @route       POST api/profile/education
// @description Add Experience to profile 
// @access      Private

router.post('/education', passport.authenticate('jwt', { session: false}), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors
    return res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
        .then(profile => {
          const newEdu = {
            school: req.body.school,
            degree: req.body.degree,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
          }

          // Add To Experience Array
          profile.education.unshift(newEdu);

          profile.save()
              .then(profile => res.json(profile))
        })
})

// @route       DELETE api/profile/experience/:exp_id
// @description Delete Experience From Profile
// @access      Private

router.delete('/experience/:exp_id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id })
        .then(profile => {
         const removeIndex = profile.experience
         .map(item => item.id)
         .indexOf(req.params.exp_id);

         //Splice out of array
         profile.experience.splice(removeIndex, 1);

         // Save
         profile.save().then(profile => res.json(profile))
        })
        .catch(err => res.status(404).json(err))
     })

     // @route       DELETE api/profile/education/:edu_id
// @description Delete education From Profile
// @access      Private

router.delete('/education/:edu_id', passport.authenticate('jwt', { session: false}), (req, res) => {
  Profile.findOne({ user: req.user.id })
        .then(profile => {
         const removeIndex = profile.education
         .map(item => item.id)
         .indexOf(req.params.edu_id);

         //Splice out of array
         profile.education.splice(removeIndex, 1);

         // Save
         profile.save().then(profile => res.json(profile))
        })
        .catch(err => res.status(404).json(err))
     })

// @route       DELETE api/profile
// @description Delete User and Profile
// @access      Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id })
        .then(() => {
          User.findOneAndRemove({ _id: req.user.id })
            .then(() => res.json({ success: true }))
        })
     }
);

module.exports = router;
