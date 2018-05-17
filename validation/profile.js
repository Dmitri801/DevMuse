const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!Validator.isLength(data.handle, { min: 2, max: 40 })) {
      errors.handle = 'Handle Needs To Be Between 2 and 40 Characters'
    } 
     if (Validator.isEmpty(data.handle)) {
       errors.handle = "Profile Handle Is Required";
     } 
     if (Validator.isEmpty(data.status)) {
       errors.status = "Status Field is Required";
     } 
     if (Validator.isEmpty(data.skills)) {
       errors.skills = "Skills Field is Required";
     } 

     if(!isEmpty(data.website)) {
       if(!Validator.isURL(data.website)) {
         errors.website = 'Not a valid URL..'
       }
     }
      if(!isEmpty(data.youtube)) {
       if(!Validator.isURL(data.youtube)) {
         errors.youtube = 'Not a valid URL..'
       }
     }
      if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
          errors.twitter = "Not a valid URL..";
        }
      }
       if (!isEmpty(data.facebook)) {
         if (!Validator.isURL(data.facebook)) {
           errors.facebook = "Not a valid URL..";
         }
       }
        if (!isEmpty(data.linkedin)) {
          if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = "Not a valid URL..";
          }
        }
         if (!isEmpty(data.soundcloud)) {
           if (!Validator.isURL(data.soundcloud)) {
             errors.soundcloud = "Not a valid URL..";
           }
         }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};