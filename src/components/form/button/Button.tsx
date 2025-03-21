import React from 'react';
import './button.scss';

const Button = ({ onClick, children, outline, type, reverseArrow, secondary, noArrow }:
  { onClick?: () => void, children?: React.ReactNode, outline?: boolean, type?: 'submit' | 'button', reverseArrow?: boolean, secondary?: boolean, noArrow?: boolean }
) => {
  return (
    <button className={`
      ${outline ? 'outline' : ''}
      ${secondary ? 'secondary' : ''}
      `}
    type={type || 'button'}
    onClick={onClick}>
      {children}
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{transform: reverseArrow ? 'rotate(180deg)' : '', display: noArrow ? 'none' : ''}}
      >
        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  );
};

export default Button;