import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { toggleLeftDrawer, closeLeftDrawer } from '../../ducks/ui';

const auth = firebase.auth;
const provider = new auth.GoogleAuthProvider();

export const loginClick = () => {
  auth().signInWithRedirect(provider);
};

export const logoutClick = () => {
  firebase.auth().signOut();
};

export class Header extends React.Component {
  toggleLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(toggleLeftDrawer());
  };

  closeLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(closeLeftDrawer());
  };

  navigateHome = () => {
    this.closeLeftDrawerClick();
    this.props.history.push('/dashboard');
  };

  renderLoginButton = () => (
    this.props.isAuthenticated
      ? (<FlatButton id="head-logout-button" label="Logout" onClick={logoutClick}/>)
      : (<FlatButton id="head-logout-button" label="Login" onClick={loginClick}/>)
  );

  render = () => (
      <AppBar
        title={<span style={{ cursor: 'pointer' }}>{'SD Templates'}</span>}
        iconElementLeft={<IconButton><FontIcon className="material-icons">menu</FontIcon></IconButton>}
        onLeftIconButtonTouchTap={this.toggleLeftDrawerClick}
        onTitleTouchTap={this.navigateHome}
        iconElementRight={this.renderLoginButton()}
      />
    );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

export default withRouter(connect(
  mapStateToProps,
)(Header));