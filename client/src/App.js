import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from "./components/add-credentials/AddEducation";
import NotFound from './components/not-found/NotFound';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/common/PrivateRoute';
import Login from "./components/auth/Login";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from './components/post/Post';
import { setCurrentUser, logOutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 
import { Provider }  from 'react-redux';
import store from "./store";
import './App.css'; 

// Check for token
if(localStorage.jwtToken) {
  // Set The Auth Token Header Auth
  setAuthToken(localStorage.jwtToken);
  // Decode Token and Get user Info And Expiration
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logOutUser());
    // Clear Current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect To Login
    window.location.href = '/login';

  }
}



class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Router>
      <div className="App">
      <Navbar />
      <Route exact path='/' component={Landing} />
      <div className="container">
        {/* PUBLIC ROUTES */}
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/not-found' component={NotFound} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:handle' component={Profile} />
        {/* PRIVATE ROUTES */}
        <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        </Switch>
        <Switch>
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        </Switch>
         <Switch>
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
        </Switch>
        <Switch>
           <PrivateRoute exact path="/add-education" component={AddEducation} />
        </Switch>
         <Switch>
           <PrivateRoute exact path="/feed" component={Posts} />
        </Switch>
        <Switch>
         <PrivateRoute exact path="/post/:id" component={Post} />
         </Switch>
      </div>
      <Footer />
      </div>
    </Router>
    </Provider>
    );
  }
}

export default App;
