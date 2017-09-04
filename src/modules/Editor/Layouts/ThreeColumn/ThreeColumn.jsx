import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ContentContainer from '../../ContentContainer';
import { moveLayoutUp, moveLayoutDown } from '../../../../ducks/editor';

export class ThreeColumn extends React.Component {
  render = () => {
    const {containers, sectionKey, layoutKey, dispatch, content, currentContentID} = this.props;
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
      moveLayoutDown(content, currentContentID, sectionKey, layoutKey, dispatch);
    };
    const moveUp = () => {
      moveLayoutUp(content, currentContentID, sectionKey, layoutKey, dispatch);
    };

    return (
      <div className="sd-layout" onClick={onClick} ref={setRef}>
        <table width="100%" style={{backgroundColor: "#1b1c1c", borderCollapse: "collapse"}}>
          <tbody>
          <tr>
            <td style={{padding: 0}}>
              <table width="600" style={{backgroundColor: "#ffffff", borderCollapse: "collapse", width: "600px", margin: "0 auto"}}>
                <tbody>
                <tr>
                  <td width="33%" style={{
                    fontFamily: "Times, Arial, sans-serif",
                    fontWeight: "bold",
                    verticalAlign: "top",
                    fontSize: "24px",
                    textAlign: "center",
                    lineHeight: "30px",
                    color: "#333333",
                    fontStyle: "italic",
                  }} className="opensans">
                    <ContentContainer sectionKey={sectionKey} layoutKey={layoutKey} containerKey={0} contentBlocks={containers.get(0, [])}/>
                  </td>
                  <td width="33%" style={{
                    fontFamily: "Times, Arial, sans-serif",
                    fontWeight: "bold",
                    verticalAlign: "top",
                    fontSize: "24px",
                    textAlign: "center",
                    lineHeight: "30px",
                    color: "#333333",
                    fontStyle: "italic",
                  }} className="opensans">
                    <ContentContainer sectionKey={sectionKey} layoutKey={layoutKey} containerKey={1} contentBlocks={containers.get(1, [])}/>
                  </td>
                  <td width="33%" style={{
                    fontFamily: "Times, Arial, sans-serif",
                    fontWeight: "bold",
                    verticalAlign: "top",
                    fontSize: "24px",
                    textAlign: "center",
                    lineHeight: "30px",
                    color: "#333333",
                    fontStyle: "italic",
                  }} className="opensans">
                    <ContentContainer sectionKey={sectionKey} layoutKey={layoutKey} containerKey={2} contentBlocks={containers.get(2, [])}/>
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
  content: ImmutablePropTypes.list,
  currentContentID: PropTypes.number.isRequired,
};

export const mapStateToProps = state => ({
  content: state.editor.get('content'),
  currentContentID: state.editor.get('currentContentID'),
});

export default connect(
  mapStateToProps,
)(ThreeColumn);
