// components/ui/Anchor.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface AnchorProps {
  href: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: '_self' | '_blank' | '_parent' | '_top';
  rel?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  authRequired?: boolean;
}

const Anchor: React.FC<AnchorProps> = ({
  href,
  onClick,
  target = '_self',
  rel = '',
  disabled = false,
  className = '',
  style = {},
  children,
  authRequired = false,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isInternalLink = href.startsWith('/');

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);

    if (!event.defaultPrevented && isInternalLink) {
      event.preventDefault();
      
      if (authRequired && !isAuthenticated()) {
        navigate('/login');
        return;
      }
      
      navigate(href);
    }
  };

  const getRel = () => {
    if (rel) return rel;
    return target === '_blank' ? 'noopener noreferrer' : '';
  };

  return (
    <a
      href={disabled ? undefined : href}
      onClick={handleClick}
      target={disabled ? undefined : target}
      rel={getRel()}
      className={`transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'} ${className}`}
      style={style}
      aria-disabled={disabled}
    >
      {children}
    </a>
  );
};

export default Anchor;