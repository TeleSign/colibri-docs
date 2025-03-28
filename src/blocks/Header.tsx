import React from 'react';
import Logo from '@/assets/colibri.png';

interface HeaderProps {
  isDoc: boolean;
  title?: string;
}

export const Header = ({ isDoc, title }: HeaderProps) => (
  <div className={`main-header${isDoc ? ' is-doc' : ''}`}>
    <img src={Logo} alt="Colibri logo" />
    {!isDoc ? <h1>Colibri Design System</h1> : <h1>{title}</h1>}
  </div>
);
