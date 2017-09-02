import React from 'react';
import firebase from 'firebase';
import config from '../../config';


firebase.initializeApp(config);

export class Init extends React.Component {
  componentDidMount = () => {};

  render = () => null;
}


export default Init;
