import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${className}`}
      {...props}
    />
  );
};

export default Input;