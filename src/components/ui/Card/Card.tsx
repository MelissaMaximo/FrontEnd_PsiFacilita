import React, { ReactNode } from 'react';

interface CardProps {
  children?: ReactNode;
  className?: string;
  title?: string;
  value?: string | number;
  description?: string;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  title, 
  value, 
  description 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 md:p-6 ${className}`}>
      {title && (
        <h3 className="text-sm md:text-base font-medium text-gray-500">
          {title}
        </h3>
      )}
      {value && (
        <p className="text-2xl md:text-3xl font-bold my-1 md:my-2 text-emerald-800">
          {value}
        </p>
      )}
      {description && (
        <p className="text-xs md:text-sm text-gray-400">
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export default Card;