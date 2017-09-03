import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from '../../config';

firebase.initializeApp(config);

export class Init extends React.Component {
  componentDidMount = () => {};

  render = () => null;
}

Init.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Init);
