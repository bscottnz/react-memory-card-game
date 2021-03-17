import React from 'react';
import logo from '../pokemon-logo.png';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} />
      </div>
      <p className="sub-title">Memory Game</p>
      <p className="game-rules">
        Test your memory by selecting a Pokemon and reshuffling the cards. Don't select the same
        Pokemon twice!
      </p>
    </div>
  );
};

export default Header;
