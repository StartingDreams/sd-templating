import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { fromJS } from 'immutable';
import Drawer from 'material-ui/Drawer';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeSidebar, updateContent, getFailure } from '../../../ducks/editor';
import StyleEditor from './StyleEditor';

export class Sidebar extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    this.layoutStyles = nextProps.sidebar.getIn(['layoutSettings', 'renderStyles'], fromJS([]));
  };

  closeClick = () => {
    const { dispatch, content, currentContentID, sidebar } = this.props;
    const newContent = content.setIn([
      currentContentID,
      'sections',
      sidebar.getIn(['layoutSettings', 'sectionKey']),
      'layouts',
      sidebar.getIn(['layoutSettings', 'layoutKey']),
      'styleData'
      ], this.layoutStyles);
    updateContent(dispatch, newContent).catch((error) => {
      dispatch(getFailure(error.message));
    });
    dispatch(closeSidebar());
  };

  updateStyles = (newStyles, styleKey) => {
    this.layoutStyles = this.layoutStyles.set(styleKey, newStyles);
  };

  render() {
    if (!this.props.sidebar.get('open')) {
      return null;
    }

    return (
      <Drawer
        openSecondary={true}
        open={true}
        containerStyle={{ top: '64px' }}
        docked={false}
        onRequestChange={() => {this.closeClick()}}
        width={300}
      >
        { this.layoutStyles.map((style, key) => (
            <StyleEditor
              key={key}
              name={style.name}
              currentStyles={style}
              updateStyles={(newStyles) => {
                this.updateStyles(newStyles, key);
              }}
              underlineShow={false}
            />
        )) }
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  dispatch: PropTypes.func,
  sidebar: ImmutablePropTypes.map,
  content: ImmutablePropTypes.list,
  currentContentID: PropTypes.number.isRequired,
};

export const mapStateToProps = state => ({
  sidebar: state.editor.get('sidebar'),
  content: state.editor.get('content'),
  currentContentID: state.editor.get('currentContentID'),
});

export default connect(
  mapStateToProps,
)(Sidebar);
