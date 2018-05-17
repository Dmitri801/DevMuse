const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String
      },
      company: {
        type: String
      },
      location: {
        type: String
      },
      from: {
        type: Date
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
     }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: false
      },
      degree: {
        type: String,
        required: false
      },
      fieldofstudy: {
        type: String,
        required: false
      },
      from: {
        type: Date,
        required: false
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: [
   { youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    soundcloud: {
      type: String
    },
    linkedin: {
      type: String
    },
  date: {
    type: Date,
    default: Date.now
  }
}
 ]
});


module.exports = Profile = mongoose.model('profile', ProfileSchema);