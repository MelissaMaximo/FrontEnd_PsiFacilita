import React, { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg'; // Adicione este tipo

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  size?: ButtonSize; // Adicione esta propriedade
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  size = 'md', // Valor padrão
  className = '',
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
  const variantClasses = {
    primary: 'bg-green-700 text-white hover:bg-green-800',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 hover:bg-gray-50',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };
  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-5 py-3'
  };
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;