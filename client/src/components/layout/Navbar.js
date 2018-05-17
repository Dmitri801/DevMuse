// CLASS BASED COMPONENT - short key = rcc *TABKEY*
import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/authActions';

class Navbar extends Component {
  onLogOutClick = (e) => {
    e.preventDefault()
    this.props.logOutUser();
    
  }
    render() {
      const { isAuthenticated, user } = this.props.auth;

      const authLinks = <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <a href="#!" className="nav-link" onClick={this.onLogOutClick}>
              <img src={user.avatar} alt={user.name} style={{ maxWidth: "20px", marginRight: "5px" }} title="You Must Have A Gravatar Connected To Your Email To Display An Image" className="rounded-circle"/>
              Log Out
            </a>
          </li>
        </ul>;

      const guestLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
           </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
         </ul>
        )
    return <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">
              DevMuse
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/profiles">
                    {" "}
                    Developers
                  </Link>
                </li>
              </ul>
              {isAuthenticated ? (authLinks) : (guestLinks)}
            </div>
          </div>
        </nav>
      </div>;
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logOutUser })(Navbar);