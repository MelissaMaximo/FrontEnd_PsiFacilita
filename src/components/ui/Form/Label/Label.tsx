import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>

const Label: React.FC<LabelProps> = ({ className = '', ...props }) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    />
  );
};

export default Label;