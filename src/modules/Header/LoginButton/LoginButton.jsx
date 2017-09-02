import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebase, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase';


export class LoginButton extends Component {
  state = {
    isLoading: false
  };

  googleLogin = loginData => {
    this.setState({ isLoading: true });
    return this.props.firebase
      .login({ provider: 'google' })
      .then(() => {
        this.setState({ isLoading: false });
        // this is where you can redirect to another route
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        console.log('there was an error', error);
        console.log('error prop:', this.props.authError); // thanks to connect
      })
  };

  render () {
    const { authError, auth } = this.props;
    console.log(this.props);
    if (!isLoaded(auth)) {
      return (
        <div>
          <span>Loading</span>
        </div>
      )
    }

    if (isEmpty(auth)) {
      return (
        <div>
          <span>Login page</span>
          <GoogleButton onClick={this.googleLogin} />
        </div>
      )
    }

    return (
      <p>Welcome!</p>
    )

  }
}

LoginButton.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  })
};

export default compose(
  firebase(),
  connect(({ firebase: { auth, authError, profile }}) => ({
    authError,
    auth,
    profile
  }))
)(LoginButton);