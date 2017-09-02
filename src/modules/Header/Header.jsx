import React from 'react';
import {Link} from 'react-router-dom';
import LoginButton from './LoginButton';
import './styles.css';

export default () => (
  <div className="header">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/account">Account</Link></li>
      <li><LoginButton /></li>
    </ul>
  </div>
);

