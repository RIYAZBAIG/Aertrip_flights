import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="./photos/coco.png" alt="Logo" />
      </div>
      <nav className="menu">
        <a href="#flight" style={{ position: "relative", right: 700 }}>FLIGHT</a>
        <a href="#hotel" style={{ position: "relative", right: 650 }}>HOTEL</a>
        <a href="#visa" style={{ position: "relative", right: 600 }}>VISA</a>
        <a href="#holidays" style={{ position: "relative", right: 550 }}>HOLIDAYS</a>
      </nav>
    </header>
  );
};

export default Header;
