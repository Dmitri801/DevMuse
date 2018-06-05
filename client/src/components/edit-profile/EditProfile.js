import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import isEmpty from '../../validation/is-empty';

class EditProfile extends Component {
  state = {
    displaySocialInputs: false,
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    soundcloud: '',
    youtube: '',
    linkedin: '',
    errors: {},
    
  }
  componentDidMount() {
    this.props.getCurrentProfile()
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
    if(nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      console.log(profile);
      // Change Skills array to comma seperated string
      const skillsCSV = profile.skills.join(',');

      // Check to see if profile field doesn't exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : "";
      profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : "";
      profile.soundcloud = !isEmpty(profile.social.soundcloud) ? profile.social.soundcloud : "";
      profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : "";
      profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        soundcloud: profile.soundcloud,
        youtube: profile.youtube,
        linkedin: profile.linkedin
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      soundcloud: this.state.soundcloud,
      youtube: this.state.youtube,
      linkedin: this.state.linkedin
    }
    this.props.createProfile(profileData, this.props.history);
  
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors, displaySocialInputs } = this.state;
    
    let socialInputs;


    // const loadingWheel = (
    // <div className="spinnerXyZ"></div>
    // );


    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Soundcloud Profile URL"
            name="soundcloud"
            icon="fab fa-soundcloud"
            value={this.state.soundcloud}
            onChange={this.onChange}
            error={errors.soundcloud}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

        </div>

      )
    }
    // Select Options For Status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Student Or Learning', value: 'Student Or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Musician', value: 'Musician' },
      { label: 'Other', value: 'Other' }
    ];
    
    return <div className="edit-profile">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
             </Link>
            <h1 className="display-4 text-center text-info">
              Edit Profile
              </h1>
            
            <small className="d-block pb-3">* = Required Fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup placeholder="* Profile Handle" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle} loading={this.state.loading} info="A unique handle for your profile URL. Your full name, company name, nickname, band name, ect" />
              <SelectListGroup placeholder="Status" name="status" value={this.state.status} onChange={this.onChange} error={errors.status} loading={this.state.loading} options={options} info="Give us an idea of your current career status" />
              <TextFieldGroup placeholder="Company" name="company" value={this.state.company} onChange={this.onChange} error={errors.company} loading={this.state.loading} info="Your own company, or where you work" />
              <TextFieldGroup placeholder="Website" name="website" value={this.state.website} onChange={this.onChange} error={errors.website} info="Band or Professional website" />
              <TextFieldGroup placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} error={errors.location} info="Your Current Location (eg: Salt Lake City, UT, USA)" />
              <TextFieldGroup placeholder="* Skills" name="skills" value={this.state.skills.toString()} onChange={this.onChange} error={errors.skills} info="Please use comma seperated values (eg: Javascript, PHP, CSS, Guitars)" />
              <TextFieldGroup placeholder="Github Username" name="githubusername" value={this.state.githubusername} onChange={this.onChange} error={errors.githubusername} info="If you want your latest repos and a Github Link, include your username" />
              <TextAreaFieldGroup placeholder="Short Bio" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} info="Tell us a bit about yourself" />

              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-dark" onClick={() => this.setState(
                    prevState => ({
                      displaySocialInputs: !prevState.displaySocialInputs
                    })
                  )}>
                  Add Social Network Links
                    </button>
                <span className="text-muted"> **Optional</span>
              </div>
              {socialInputs}
              <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                  
            </form> 
          </div>
        </div>
      </div>
    </div>;
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))