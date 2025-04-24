import React from 'react';
import { Link } from 'react-router-dom';
import Icon, { IconType } from '../../ui/Icon';

interface SidebarItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ name, icon, path }) => {
  const hoverBgColor = '#2d6e42'; // Versão mais clara de #245b36 para hover
  
  return (
    <li className="mb-2">
      <Link
        to={path}
        className="flex items-center p-3 rounded-lg transition-colors hover:opacity-90"
        style={{ 
          ":hover": { backgroundColor: hoverBgColor } // Isso não funciona diretamente em React
        }}
        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = hoverBgColor }}
        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '' }}
      >
        <Icon type={icon} className="mr-3 w-5 h-5" />
        <span className="text-sm md:text-base">{name}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;