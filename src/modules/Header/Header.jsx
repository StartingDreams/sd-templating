import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../Firebase/containers/Login'
import './styles.css';

export default () => (
  <div className="header">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/account">Account</Link></li>
      <li><Login /></li>
    </ul>
  </div>
);

