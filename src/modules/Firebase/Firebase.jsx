import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Init from './containers/Init';
import Auth from './containers/Auth';
import Data from './containers/Data';

export class Firebase extends React.Component {
  render = () => {
    const { isAuthenticated } = this.props;
    return (
      <div>
        <Init/>
        <Auth/>
        { isAuthenticated && <Data/> }
      </div>
    );
  }
}

Firebase.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

export default connect(
  mapStateToProps,
)(Firebase);
