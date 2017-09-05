import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ContentContainer from '../../ContentContainer';
import Base from '../Base';


export class OneColumn extends Base {
  defaultStyles = () => {
    return fromJS([
      {
        name: "Outer",
        styles: {
          backgroundColor: "#1b1c1c",
          borderCollapse: "collapse",
          padding: 0,
          border: 0,
        },
        editableStyles: {
          backgroundColor: "#1b1c1c",
          border: 0,
        }
      },
      {
        name: "Inner",
        styles: {
          backgroundColor: "#ffffff",
          borderCollapse: "collapse",
          width: "600px",
          margin: "0 auto",
          padding: 0,
          border: 0,
        },
        editableStyles: {
          backgroundColor: "#ffffff",
          width: "600px",
          margin: "0 auto",
          border: 0,
        }
      },
      {
        name: "Column",
        styles: {
          backgroundColor: "#ffffff",
          fontWeight: "400",
          lineHeight: "1.2",
          color: "#333333",
          fontStyle: "normal",
          verticalAlign: "top",
          textAlign: "center",
          width: "100%",
          fontSize: "24px",
          padding: 0,
          border: 0,
        },
        editableStyles: {
          backgroundColor: "#ffffff",
          fontWeight: "400",
          lineHeight: "1.2",
          color: "#333333",
          fontStyle: "normal",
          verticalAlign: "top",
          textAlign: "center",
          fontSize: "24px",
          padding: 0,
          border: 0,
        }
      },
    ]);
  };

  render = () => {
    const {containers, sectionKey, layoutKey } = this.props;
    let renderStyles = this.defaultStyles();
    if (typeof this.props.renderStyles !== 'undefined') {
      renderStyles = this.props.renderStyles;
    }

    const defaultStyles = this.defaultStyles();
    const outer = renderStyles.get(0, defaultStyles.get(0)).toJS();
    const inner = renderStyles.get(1, defaultStyles.get(1)).toJS();
    const columnOne = renderStyles.get(2, defaultStyles.get(2)).toJS();
    return (
      <div className="sd-layout" onClick={this.onClick} ref={this.setRef}>
        <table width="100%" style={Object.assign(outer.styles, outer.editableStyles)}>
          <tbody>
          <tr>
            <td style={{padding: 0}}>
              <table style={Object.assign(inner.styles, inner.editableStyles)}>
                <tbody>
                <tr>
                  <td width="100%" style={Object.assign(columnOne.styles, columnOne.editableStyles)}>
                    <ContentContainer sectionKey={sectionKey} layoutKey={layoutKey} containerKey={0} contentBlocks={containers.get(0, [])}/>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
        {this.changeLayoutDialog(sectionKey, layoutKey)}
      </div>
    );
  }
}

OneColumn.propTypes = {
  mode: PropTypes.string,
  dispatch: PropTypes.func,
  // changeLayout: PropTypes.bool,
  content: ImmutablePropTypes.list,
  sidebar: ImmutablePropTypes.map,
  currentContentID: PropTypes.number.isRequired,
};

export const mapStateToProps = state => ({
  mode: state.editor.get('mode'),
  changeLayout: state.editor.get('changeLayout'),
  content: state.editor.get('content'),
  sidebar: state.editor.get('sidebar'),
  currentContentID: state.editor.get('currentContentID'),
});

export default connect(
  mapStateToProps,
)(OneColumn);
