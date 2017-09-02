import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class NoMatch extends React.Component {
  goLogin = () => (<Redirect to={{ pathname: '/' }} />);
  goDashboard = () => (<Redirect to={{ pathname: '/dashboard' }} />);
  render = () => (this.props.isAuthenticated ? (this.goDashboard()) : (this.goLogin()));
}

NoMatch.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

export default withRouter(connect(
  mapStateToProps,
)(NoMatch));