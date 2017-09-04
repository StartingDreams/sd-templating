import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { update } from '../../../../ducks/example';

export class Text extends React.Component {
  onChange = () => {
    if (!this.ref) {
      return;
    }
    const html = this.ref.innerHTML;
    if (html === this.lastHtml) {
      return;
    }
    this.lastHtml = html;
    this.updateContent(html);
  };

  updateContent = (html) => {
    const { editor, sectionKey, layoutKey, containerKey, contentKey, subContentKey, dispatch} = this.props;
    const newEditor = editor.setIn([
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'containers',
      containerKey,
      contentKey,
      'data',
      'text',
      subContentKey,
    ], html);
    dispatch(update(newEditor));
  };

  render = () => {
    const { defaultText, currentText } = this.props;
    const startingHtml = currentText ? currentText : defaultText;
    const setRef = (ref) => {
      this.ref = ref;
    };
    this.lastHtml = startingHtml;
    return (
      <span
        contentEditable
        suppressContentEditableWarning
        ref={setRef}
        onBlur={this.onChange}
      >{startingHtml}</span>
    );
  }
}

Text.propTypes = {
  dispatch: PropTypes.func,
  editor: ImmutablePropTypes.map,
};

export const mapStateToProps = state => ({
  editor: state.example.get('editor'),
});

export default connect(
  mapStateToProps,
)(Text);