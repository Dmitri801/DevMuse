import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProfile } from "../../actions/profileActions";
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from "../common/SelectListGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";

class CreateProfile extends Component {
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
    loading: false
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
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
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { errors, displaySocialInputs, loading } = this.state;
    let socialInputs;
    const loadingWheel = <div className="spinnerXy" />;
    if(displaySocialInputs) {
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
      { label: 'Junior Developer', value: 'Junior Developer'},
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Student Or Learning', value: 'Student Or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Musician', value: 'Musician' },
      { label: 'Other', value: 'Other' }
    ]; 
    return <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center text-info">
                Create Your Profile
              </h1>
              <p className="lead text-center">
                Lets Get Some Info To Make That Profile Standout!
              </p>
              <small className="d-block pb-3">* = Required Fields</small>
              {!loading ? <form onSubmit={this.onSubmit}>
                  <TextFieldGroup placeholder="* Profile Handle" name="handle" value={this.state.handle} onChange={this.onChange} error={errors.handle} loading={this.state.loading} info="A unique handle for your profile URL. Your full name, company name, nickname, band name, ect" />
                  <SelectListGroup placeholder="Status" name="status" value={this.state.status} onChange={this.onChange} error={errors.status} loading={this.state.loading} options={options} info="Give us an idea of your current career status" />
                  <TextFieldGroup placeholder="Company" name="company" value={this.state.company} onChange={this.onChange} error={errors.company} loading={this.state.loading} info="Your own company, or where you work" />
                  <TextFieldGroup placeholder="Website" name="website" value={this.state.website} onChange={this.onChange} error={errors.website} loading={this.state.loading} info="Band or Professional website" />
                  <TextFieldGroup placeholder="Location" name="location" value={this.state.location} onChange={this.onChange} error={errors.location} loading={this.state.loading} info="Your Current Location (eg: Salt Lake City, UT, USA)" />
                  <TextFieldGroup placeholder="* Skills" name="skills" value={this.state.skills} onChange={this.onChange} error={errors.skills} loading={this.state.loading} info="Please use comma seperated values (eg: Javascript, PHP, CSS, Guitars)" />
                  <TextFieldGroup placeholder="Github Username" name="githubusername" value={this.state.githubusername} onChange={this.onChange} error={errors.githubusername} loading={this.state.loading} info="If you want your latest repos and a Github Link, include your username" />
                  <TextAreaFieldGroup placeholder="Short Bio" name="bio" value={this.state.bio} onChange={this.onChange} error={errors.bio} loading={this.state.loading} info="Tell us a bit about yourself" />

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
                </form> : { loadingWheel }}
            </div>
          </div>
        </div>
      </div>;
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))