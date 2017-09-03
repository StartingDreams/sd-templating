import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ContentContainer from '../../ContentContainer';
import { moveLayoutUp, moveLayoutDown } from '../../../../ducks/example';

export class ThreeColumn extends React.Component {
  render = () => {
    const {containers, sectionKey, layoutKey, dispatch, editor} = this.props;
    let node = null;
    const setRef = (ref) => {
      node = ref;
    };
    const onClick = (ev) => {
      if (!node) {
        return;
      }
      const x = ev.clientX;
      const y = ev.clientY;
      const cords = node.getBoundingClientRect();
      const onRight = (cords.right - x) < 75;
      const onTop = (y - cords.top) < 30;
      const onBottom = (cords.bottom - y) < 30;
      if (onTop && onRight) {
        moveUp();
      } else if (onBottom && onRight) {
        moveDown();
      }
    };
    const moveDown = () => {
      moveLayoutDown(editor, sectionKey, layoutKey, dispatch);
    };
    const moveUp = () => {
      moveLayoutUp(editor, sectionKey, layoutKey, dispatch);
    };

    return (
      <div className="sd-layout" onClick={onClick} ref={setRef}>
        <table width="100%" style={{backgroundColor: "#1b1c1c"}}>
          <tbody>
          <tr>
            <td>
              <table width="600" style={{backgroundColor: "#ffffff", width: "600px", margin: "0 auto"}}>
                <tbody>
                <tr>
                  <td width="100%" style={{
                    fontFamily: "Times, Arial, sans-serif",
                    fontWeight: "bold",
                    verticalAlign: "top",
                    fontSize: "24px",
                    textAlign: "center",
                    lineHeight: "30px",
                    color: "#333333",
                    fontStyle: "italic",
                  }} className="opensans">
                    <ContentContainer contentBlocks={containers.get(0, [])}/>
                  </td>
                  <td width="100%" style={{
                    fontFamily: "Times, Arial, sans-serif",
                    fontWeight: "bold",
                    verticalAlign: "top",
                    fontSize: "24px",
                    textAlign: "center",
                    lineHeight: "30px",
                    color: "#333333",
                    fontStyle: "italic",
                  }} className="opensans">
                    <ContentContainer contentBlocks={containers.get(1, [])}/>
                  </td>
                  <td width="100%" style={{
                    fontFamily: "Times, Arial, sans-serif",
                    fontWeight: "bold",
                    verticalAlign: "top",
                    fontSize: "24px",
                    textAlign: "center",
                    lineHeight: "30px",
                    color: "#333333",
                    fontStyle: "italic",
                  }} className="opensans">
                    <ContentContainer contentBlocks={containers.get(2, [])}/>
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

ThreeColumn.propTypes = {
  dispatch: PropTypes.func,
  editor: ImmutablePropTypes.map,
};

export const mapStateToProps = state => ({
  editor: state.example.get('editor'),
});

export default connect(
  mapStateToProps,
)(ThreeColumn);
