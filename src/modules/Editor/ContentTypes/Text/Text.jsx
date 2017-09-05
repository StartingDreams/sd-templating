import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { updateContent, getFailure } from '../../../../ducks/editor';

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
    this.update(html);
  };

  update = (html) => {
    const { content, currentContentID, sectionKey, layoutKey, containerKey, contentKey, subContentKey, dispatch} = this.props;
    const updatedContent = content.setIn([
      currentContentID,
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

    updateContent(dispatch, updatedContent).catch((error) => {
      dispatch(getFailure(error.message));
    });
  };

  render = () => {
    const { defaultText, currentText, mode } = this.props;
    const startingHtml = currentText ? currentText : defaultText;
    const setRef = (ref) => {
      this.ref = ref;
    };
    this.lastHtml = startingHtml;

    return (
      <span
        contentEditable={mode === 'start'}
        suppressContentEditableWarning
        ref={setRef}
        onBlur={this.onChange}
      >{startingHtml}</span>
    );
  }
}

Text.propTypes = {
  content: ImmutablePropTypes.list,
  currentContentID: PropTypes.number.isRequired,
  mode: PropTypes.string,
};

export const mapStateToProps = state => ({
  content: state.editor.get('content'),
  currentContentID: state.editor.get('currentContentID'),
  mode: state.editor.get('mode'),
});

export default connect(
  mapStateToProps,
)(Text);