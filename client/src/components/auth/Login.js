// CLASS BASED COMPONENT - short key = rcc *TABKEY*

import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      loading: false
    }
  }
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
        this.setState({ loading: true })
        setTimeout(() => {
          this.setState({
            loading: false
          });
          this.props.history.push("/dashboard");
        }, 600) 
      
      
    }

    if(nextProps.errors) {
      if(this.state.email === '' || this.state.password === '') {
        this.setState({ errors: nextProps.errors })
      } else {
        this.setState({ loading: true })
        setTimeout(() => {
          this.setState({
            errors: nextProps.errors,
            loading: false
          });
        }, 600)  
      }
    }
  }



  onSubmit = (e) => {
    e.preventDefault()
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    
      this.props.loginUser(userData); 
  
    
  }
  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    const { errors } = this.state;

    const loadingWheel = (
      <div className="spinnerX"></div>
    )

    return <div ref="myRef">
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center text-dark">Log In</h1>
                <p className="lead text-center">
                  Sign in to your DevMuse account
                </p>
                <form onSubmit={this.onSubmit} noValidate>
                  <TextFieldGroup 
                  placeholder={'Email Address'}
                  name={'email'}
                  type={'email'}
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  loading={this.state.loading}
                  />
                  <TextFieldGroup
                    placeholder={'Password'}
                    name={'password'}
                    type={'password'}
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    loading={this.state.loading}
                  />
                  {this.state.loading ? loadingWheel : <input type="submit" className="btn btn-info btn-block mt-4" />}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}



const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})


export default connect(mapStateToProps, { loginUser })(Login);
