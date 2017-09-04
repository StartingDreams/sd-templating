import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAll } from '../../../../ducks/editor';

export class Data extends React.Component {
  componentDidMount = () => {
    const { dispatch, isLoaded } = this.props;
    if (isLoaded === true) {
      return;
    }
    getAll(dispatch);
  };

  render = () => null;
}

Data.propTypes = {
  dispatch: PropTypes.func,
  isLoaded: PropTypes.bool.isRequired,
};

export const mapStateToProps = state => ({
  isLoaded: state.editor.get('isLoaded'),
});

export default connect(
  mapStateToProps,
)(Data);
