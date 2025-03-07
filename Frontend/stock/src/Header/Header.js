import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">StockTrade</div>
      <nav>
        <ul className="nav-links">
          <li><a href="/">Buy</a></li>
          <li><a href="/trades">Trades</a></li>
          <li><a href="/Mystocks">Lots</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
