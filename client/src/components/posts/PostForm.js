import React, { Component } from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';

class PostForm extends Component {
  state = {
    text: '',
    errors: {}
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentWillReceiveProps(newProps) {
    if(newProps.errors) {
      this.setState({ errors: newProps.errors })
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { user } = this.props.auth

    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    }

    this.props.addPost(newPost);
    this.setState({ text: '' })
  }

  render() { 
    const {errors} = this.state;
    return (
      <div>
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-header bg-dark text-info">
              Say Something...
              </div>
            <div className="card-body bg-light">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <TextAreaFieldGroup name="text" value={this.state.text} 
                  onChange={this.onChange}
                  error={errors.text}
                  placeholder="Create a post"></TextAreaFieldGroup>
                </div>
                <button type="submit" className="btn btn-dark text-info">Submit</button>
              </form>
            </div> 
          </div>
        </div>
      </div>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth

})

export default connect(mapStateToProps, { addPost })(PostForm)
