import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import firebase from 'firebase';

const auth = firebase.auth;
const provider = new auth.GoogleAuthProvider();

export const loginClick = () => {
  auth().signInWithRedirect(provider);
};

export const logoutClick = () => {
  firebase.auth().signOut();
};

export class Login extends React.Component {
  render = () => (
    this.props.isAuthenticated ? (<button onClick={logoutClick}>Logout</button>)
    : (<button onClick={loginClick}>Login</button>)
  );
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

export default withRouter(connect(
  mapStateToProps,
)(Login));
