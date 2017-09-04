import React from 'react';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import Templates from './Templates';
import Sections from './Sections';

import './Templates/template.css';

export class Editor extends React.Component {
  render = () => {
    const { content, currentContentID } = this.props;
    if (!content) {
      return null;
    }
    const editor = content.get(currentContentID);
    console.log('content', currentContentID, content.toJS());
    console.log('editor', editor.toJS());

    const RenderTemplate = Templates[editor.get('template')];
    const RenderSections = [];
    const renderStyles = [];
    const renderLayouts = [];

    editor.get('sections').map(section => {
      RenderSections.push(Sections[section.get('name')]);
      renderStyles.push(section.get('styles', fromJS({})));
      renderLayouts.push(section.get('layouts', fromJS({})));
      return false;
    });

    return (
      <div>
        <RenderTemplate
          sections={RenderSections}
          renderStyles={renderStyles}
          layouts={renderLayouts}
        />
      </div>
    );
  };
}

Editor.propTypes = {
  content: ImmutablePropTypes.list,
  currentContentID: PropTypes.number.isRequired,
};

export const mapStateToProps = state => ({
  content: state.editor.get('content'),
  currentContentID: state.editor.get('currentContentID'),
});

export default connect(
  mapStateToProps,
)(Editor);

