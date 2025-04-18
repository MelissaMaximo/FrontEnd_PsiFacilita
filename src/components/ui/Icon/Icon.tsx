import React from 'react';
import * as FiIcons from 'react-icons/fi';

export type IconType = 
  'dashboard' | 
  'calendar' | 
  'users' | 
  'folder' | 
  'settings' | 
  'logout';

interface IconProps {
  type: IconType;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ type, className = '' }) => {
  const icons = {
    dashboard: <FiIcons.FiPieChart className={className} />, // FiPieChart em vez de FiDashboard
    calendar: <FiIcons.FiCalendar className={className} />,
    users: <FiIcons.FiUsers className={className} />,
    folder: <FiIcons.FiFolder className={className} />,
    settings: <FiIcons.FiSettings className={className} />,
    logout: <FiIcons.FiLogOut className={className} />,
  };

  return icons[type];
};

export default Icon;