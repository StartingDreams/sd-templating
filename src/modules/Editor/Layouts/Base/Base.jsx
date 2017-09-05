import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { moveLayoutUp, moveLayoutDown, openSidebar, changeMode, updateContent, changeLayout, getFailure } from '../../../../ducks/editor';

export class Base extends React.Component {
  openSidebarClick = () => {
    const { dispatch, sidebar, sectionKey, layoutKey } = this.props;
    let renderStyles = this.defaultStyles();
    if (typeof this.props.renderStyles !== 'undefined') {
      renderStyles = this.props.renderStyles;
    }

    if (!sidebar.get('open')) {
      dispatch(openSidebar({
        sectionKey,
        layoutKey,
        renderStyles,
      }));
    }
  };

  changeLayout = () => {
    const {sectionKey, layoutKey, dispatch} = this.props;
    const update = {};
    update[`${sectionKey}_${layoutKey}`] = true;
    dispatch(changeLayout(update));
  };

  cancelLayoutClick = () => {
    const {dispatch} = this.props;
    dispatch(changeLayout({}));
  };

  oneColumnClick = (sectionKey, layoutKey) => {
    const {dispatch, content, currentContentID} = this.props;
    const newContent = content.setIn([
      currentContentID,
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'name'
    ], 'OneColumn');
    console.log('1column', [
      currentContentID,
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'name'
    ]);
    updateContent(dispatch, newContent).catch((error) => {
      dispatch(getFailure(error.message));
    });
    dispatch(changeLayout({}));
  };

  twoColumnClick = (sectionKey, layoutKey) => {
    const {dispatch, content, currentContentID} = this.props;
    const newContent = content.setIn([
      currentContentID,
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'name'
    ], 'TwoColumn');
    console.log('2column', [
      currentContentID,
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'name'
    ]);
    updateContent(dispatch, newContent).catch((error) => {
      dispatch(getFailure(error.message));
    });
    dispatch(changeLayout({}));
  };

  threeColumnClick = (sectionKey, layoutKey) => {
    const {dispatch, content, currentContentID} = this.props;
    const newContent = content.setIn([
      currentContentID,
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'name'
    ], 'ThreeColumn');
    console.log('3column', [
      currentContentID,
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'name'
    ]);
    updateContent(dispatch, newContent).catch((error) => {
      dispatch(getFailure(error.message));
    });
    dispatch(changeLayout({}));
  };
  threeRowClick = (sectionKey, layoutKey) => {
    const {dispatch, content, currentContentID} = this.props;
    const newContent = content.setIn([
      currentContentID,
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'name'
    ], 'ThreeRow');
    console.log('3column', [
      currentContentID,
      'sections',
      sectionKey,
      'layouts',
      layoutKey,
      'name'
    ]);
    updateContent(dispatch, newContent).catch((error) => {
      dispatch(getFailure(error.message));
    });
    dispatch(changeLayout({}));
  };

  changeLayoutDialog = (sectionKey, layoutKey) => {
    const actions = [
      <FlatButton
        label="One Column"
        onClick={() => {this.oneColumnClick(sectionKey, layoutKey)}}
      />,
      <FlatButton
        label="Two Column"
        onClick={() => {this.twoColumnClick(sectionKey, layoutKey)}}
      />,
      <FlatButton
        label="Three Column"
        onClick={() => {this.threeColumnClick(sectionKey, layoutKey)}}
      />,
      <FlatButton
        label="Three Row"
        onClick={() => {this.threeRowClick(sectionKey, layoutKey)}}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.cancelLayoutClick}
      />,
    ];

    return (<Dialog
      title="Select Layout"
      actions={actions}
      modal={true}
      open={this.props.changeLayout.get(`${sectionKey}_${layoutKey}`, false)}
    >Please select layout</Dialog>)
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
      // move up button
      this.moveUp();
    } else if (mode === 'edit') {
      // styles button
      this.openSidebarClick();
    } else if (mode === 'start') {
      // move button
      this.setMode('move');
    } else if (mode === 'layout') {
      this.changeLayout();
      this.setMode('start');
    }
  };

  bottomRightButtonClick = () => {
    const { mode } = this.props;
    if (mode === 'move') {
      // move down button
      this.moveDown();
    } else if (mode === 'edit') {
      // layout button
      this.setMode('layout');
    } else if (mode === 'start') {
      // edit button
      this.setMode('edit');
    } else if (mode === 'layout') {
      this.setMode('start');
    }
  };

  noButtonClick = () => {
    const { mode } = this.props;
    if (mode !== 'start' && mode !== 'layout') {
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

  setRef = (ref) => {
    this.node = ref;
  };
}

export default Base;