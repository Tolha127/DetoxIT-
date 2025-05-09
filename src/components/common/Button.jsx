// src/components/common/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  onClick,
  disabled = false,
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
    const variants = {
    primary: 'bg-gradient-to-r from-teal-500 to-blue-500 text-white hover:from-teal-600 hover:to-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-sm',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-sm',
    outline: 'border border-teal-500 text-teal-600 hover:bg-teal-50 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500',
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  return (
    <button
      type={type}
      className={buttonStyles}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;