import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';



class Dashboard extends Component {
 
  componentDidMount() {
    this.props.getCurrentProfile();
  }



  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    
    let dashboardContent;

    if(profile === null || loading) {
      dashboardContent = (<div                  
        className="spinnerXyZ" />)
    } else {
      // Check if logged in user has profile data 
      if(Object.keys(profile).length > 0) { // Checks to see if OBJECT is NOT empty (greater than 0)
        dashboardContent = <div>
            <p className="lead">
              Welcome, <Link 
              to={`/profile/${profile.handle}`}
              className="text-info">
                {user.name.split(" ")[0]}
              </Link>!
            </p>
            <ProfileActions />
            <Experience experiences={profile.experience} />
            <Education education={profile.education} />
            <div style={{marginTop: '60px'}}>
              <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Account</button>
            </div>
          </div>;
      } else {
        // User is Logged In, but Has No Profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome, <span className="text-dark">{user.name.split(' ')[0]}</span>!</p>
            <p className="text-center">You have not yet setup a profile, Want to create one?</p>
            <Link to="/create-profile" className="btn btn-info btn-block">Create A Profile</Link>
          </div>
        );
      }
    }
    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center text-dark">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
