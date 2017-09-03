import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { closeLeftDrawer } from '../../ducks/ui';

export class Sidebar extends React.PureComponent {
  closeLeftDrawerClick = () => {
    const { dispatch } = this.props;
    dispatch(closeLeftDrawer());
  };

  render() {
    const { leftDrawerOpen } = this.props;
    return (
      <Drawer open={leftDrawerOpen} containerStyle={{ top: '64px' }} >
        <MenuItem
          leftIcon={<FontIcon className="material-icons">dashboard</FontIcon>}
          containerElement={<NavLink to="/dashboard" />}
          onTouchTap={this.closeLeftDrawerClick}
        >
          Dashboard
        </MenuItem>
        <MenuItem
          leftIcon={<FontIcon className="material-icons">create</FontIcon>}
          containerElement={<NavLink to="/editor" />}
          onTouchTap={this.closeLeftDrawerClick}
        >
          Editor
        </MenuItem>
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  dispatch: PropTypes.func,
  leftDrawerOpen: PropTypes.bool,
};

export const mapStateToProps = state => ({
  leftDrawerOpen: state.ui.get('leftDrawerOpen'),
});

export default withRouter(connect(
  mapStateToProps,
)(Sidebar));
