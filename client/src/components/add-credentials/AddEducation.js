import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';





class AddEducation extends Component {
  state = {
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
    errors: {},
    disabled: false
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {

      this.setState({ errors: nextProps.errors })
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
      disabled: this.state.disabled
    };
    this.props.addEducation(eduData, this.props.history)
  }
  onCheck = () => {
    this.setState({ current: !this.state.current, disabled: !this.state.disabled })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }


  render() {
    const { errors } = this.state;
    return <div className="add-education">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
              </Link>
            <h1 className="display-4 text-center text-dark">
              Add Education
              </h1>
            <p className="lead text-center">
              Add any school, bootcamp, or learning center you have attended.
              </p>
            <small className="d-block pb-3">*= Required Fields</small>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup placeholder="* School" name="school" value={this.state.school} onChange={this.onChange} error={errors.school} />
              <TextFieldGroup placeholder="* Degree or Certification" name="degree" value={this.state.degree} onChange={this.onChange} error={errors.degree} />
              <TextFieldGroup placeholder="* Field of Study" name="fieldofstudy" value={this.state.fieldofstudy} onChange={this.onChange} error={errors.fieldofstudy} />
              <h6>From Date</h6>
              <TextFieldGroup type="date" name="from" value={this.state.from} onChange={this.onChange} />
              <h6>To Date</h6>
              <TextFieldGroup type="date" name="to" value={this.state.to} onChange={this.onChange} disabled={this.state.disabled ? 'disabled' : ''} />
              <div className="form-check mb-4">
                <input type="checkbox"
                  className="form-check-input"
                  name="current"
                  value={this.state.current}
                  checked={this.state.current}
                  onChange={this.onCheck}
                  id="current"
                />
                <label htmlFor="current" className="form-check-label">Currently Attending</label>
              </div>
              <TextAreaFieldGroup
                name="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.onChange}
                error={errors.description}
                info="Tell Us About The Program You Where In"
              />
              <input type="submit" className="btn btn-block btn-info mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>;
  }
}

AddEducation.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,

})


export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));