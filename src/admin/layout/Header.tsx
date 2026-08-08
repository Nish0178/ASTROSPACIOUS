import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="admin-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <Menu size={24} />
        </button>
      </div>

      <div className="admin-header-right">
        <div className="admin-header-icon">
          <Bell size={20} />
          <span className="admin-header-badge"></span>
        </div>
        
        <div className="admin-profile">
          <div className="admin-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div className="admin-profile-name" style={{ display: 'none', '@media (min-width: 640px)': { display: 'block' } } as any}>
            {user?.name || 'Administrator'}
          </div>
        </div>
      </div>
    </header>
  );
}
