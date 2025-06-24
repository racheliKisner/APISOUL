import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  //const username = localStorage.getItem('username');
  return (
    <header className="main-header">
      {/* {username && <h2>שלום, {username}!</h2>} */}
      <div className="logo">AI Learning</div>
      <nav className="nav-links">
        <Link to="/">בית</Link>
        <Link to="/register">הרשמה</Link>
        <Link to="/login" className="login-btn">כניסה</Link>
      </nav>
    </header>
  );
}
