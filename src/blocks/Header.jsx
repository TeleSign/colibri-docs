import React from 'react';
import Logo from '@/assets/colibri.png';

export const Header = ({ isDoc, title }) => (
  <div className={`main-header${isDoc ? ' is-doc' : ''}`}>
    <img src={Logo} alt="Colibri logo" />
    {!isDoc ? <h1>Colibri Design System</h1> : <h1>{title}</h1>}
  </div>
);
