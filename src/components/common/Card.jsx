// src/components/common/Card.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  elevated = false,
  onClick,
  hoverable = false,
}) => {
  const baseStyles = 'bg-white rounded-lg border border-gray-200';
  const elevatedStyles = elevated ? 'shadow-md' : '';
  const hoverStyles = hoverable
    ? 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer'
    : '';
  
  return (
    <div
      className={`${baseStyles} ${elevatedStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  elevated: PropTypes.bool,
  onClick: PropTypes.func,
  hoverable: PropTypes.bool,
};

export default Card;