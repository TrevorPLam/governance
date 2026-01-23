import React from 'react';
import { sanitizeInput } from '@governance-example/utils';

export interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

/**
 * Button component
 * 
 * Layer: Presentation
 * Boundaries: Can import from @governance-example/utils only
 */
export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
}) => {
  const safeLabel = sanitizeInput(label);
  
  const className = `btn btn-${variant}`;
  
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      dangerouslySetInnerHTML={{ __html: safeLabel }}
    />
  );
};
