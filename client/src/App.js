import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logOutUser } from './actions/authActions';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
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
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
      </div>
      <Footer />
      </div>
    </Router>
    </Provider>
    );
  }
}

export default App;
