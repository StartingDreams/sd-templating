import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Empty extends React.PureComponent {
  render = () => {
    const {sections, renderStyles, layouts, mode} = this.props;
    const templateClass = `sd-template sd-mode-${mode}`;

    return (
      <div className={templateClass}>
        {sections.map((Section, key) => (
          <Section
            key={key}
            sectionKey={key}
            renderStyles={renderStyles[key]}
            layouts={layouts[key]}
          />
        ))}
      </div>
    );
  }
}

Empty.propTypes = {
  dispatch: PropTypes.func,
  mode: PropTypes.string,
};

export const mapStateToProps = state => ({
  mode: state.editor.get('mode'),
});

export default connect(
  mapStateToProps,
)(Empty);
