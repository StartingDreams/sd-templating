import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { moveLayoutUp, moveLayoutDown, openSidebar, changeMode } from '../../../../ducks/editor';
import ContentContainer from '../../ContentContainer';

const styles = [
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
      padding: 0,
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
      padding: 0,
      border: 0,
    }
  },
  {
    name: "Column One",
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
  {
    name: "Column Two",
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
];

export class TwoColumn extends React.Component {
  openSidebarClick = () => {
    const { dispatch, sidebar, sectionKey, layoutKey } = this.props;
    if (!sidebar.get('open')) {
      dispatch(openSidebar({
        sectionKey,
        layoutKey,
        styles,
      }));
    }
  };

  setMode = (mode) => {
    const { dispatch } = this.props;
    dispatch(changeMode(mode));
  };

  onClick = (ev) => {
    if (!this.node) {
      return;
    }
    const x = ev.clientX;
    const y = ev.clientY;
    const cords = this.node.getBoundingClientRect();
    const onRight = (cords.right - x) < 75;
    const onTop = (y - cords.top) < 30;
    const onBottom = (cords.bottom - y) < 30;
    if (onTop && onRight) {
      this.topRightButtonClick();
    } else if (onBottom && onRight) {
      this.bottomRightButtonClick();
    } else {
      this.noButtonClick();
    }
  };

  topRightButtonClick = () => {
    const { mode } = this.props;
    if (mode === 'move') {
      this.moveUp();
    } else if (mode === 'edit') {
      this.openSidebarClick();
    } else if (mode === 'start') {
      this.setMode('move');
    }
  };

  bottomRightButtonClick = () => {
    const { mode } = this.props;
    if (mode === 'move') {
      this.moveDown();
    } else if (mode === 'edit') {
      this.openSidebarClick();
    } else if (mode === 'start') {
      this.setMode('edit');
    }
  };

  noButtonClick = () => {
    const { mode } = this.props;
    if (mode !== 'start') {
      this.setMode('start');
    }
  };

  moveDown = () => {
    const {sectionKey, layoutKey, dispatch, content, currentContentID} = this.props;
    moveLayoutDown(content, currentContentID, sectionKey, layoutKey, dispatch);
  };

  moveUp = () => {
    const {sectionKey, layoutKey, dispatch, content, currentContentID} = this.props;
    moveLayoutUp(content, currentContentID, sectionKey, layoutKey, dispatch);
  };

  render = () => {
    const {containers, sectionKey, layoutKey, renderStyles} = this.props;
    const setRef = (ref) => {
      this.node = ref;
    };
    const outer = renderStyles.get(0).toJS();
    const inner = renderStyles.get(1).toJS();
    const columnOne = renderStyles.get(2).toJS();
    const columnTwo = renderStyles.get(3).toJS();
    return (
      <div className="sd-layout" onClick={this.onClick} ref={setRef}>
        <table width="100%" style={Object.assign(outer.styles, outer.editableStyles)}>
          <tbody>
          <tr>
            <td style={{padding: 0}}>
              <table style={Object.assign(inner.styles, inner.editableStyles)}>
                <tbody>
                <tr>
                  <td width="50%" style={Object.assign(columnOne.styles, columnOne.editableStyles)}>
                    <ContentContainer sectionKey={sectionKey} layoutKey={layoutKey} containerKey={0} contentBlocks={containers.get(0, [])}/>
                  </td>
                  <td width="50%" style={Object.assign(columnTwo.styles, columnTwo.editableStyles)}>
                    <ContentContainer sectionKey={sectionKey} layoutKey={layoutKey} containerKey={0} contentBlocks={containers.get(0, [])}/>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

TwoColumn.propTypes = {
  mode: PropTypes.string,
  dispatch: PropTypes.func,
  content: ImmutablePropTypes.list,
  sidebar: ImmutablePropTypes.map,
  currentContentID: PropTypes.number.isRequired,
};

export const mapStateToProps = state => ({
  mode: state.editor.get('mode'),
  content: state.editor.get('content'),
  sidebar: state.editor.get('sidebar'),
  currentContentID: state.editor.get('currentContentID'),
});

export default connect(
  mapStateToProps,
)(TwoColumn);
