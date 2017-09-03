import React from 'react';
import { connect } from 'react-redux';
import Data from './Data';
import Templates from './Templates';
import Sections from './Sections';
import ImmutablePropTypes from 'react-immutable-proptypes';

import './Templates/template.css';

export class Editor extends React.Component {
  render = () => {
    const { editor } = this.props;
    const RenderTemplate = Templates[editor.get('template')];
    const RenderSections = [];
    const renderStyles = [];
    const renderLayouts = [];
    editor.get('sections').map(section => {
      RenderSections.push(Sections[section.get('name')]);
      renderStyles.push(section.get('styles'));
      renderLayouts.push(section.get('layouts'));
      return false;
    });

    return (
      <div>
        <Data/>
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
  editor: ImmutablePropTypes.map,
};

export const mapStateToProps = state => ({
  editor: state.example.get('editor'),
});

export default connect(
  mapStateToProps,
)(Editor);

