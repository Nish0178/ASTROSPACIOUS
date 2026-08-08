import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Tags,
  Image as ImageIcon,
  Mail, 
  Users,
  MessageSquare, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();

  const navItems = [
    { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/articles', icon: <FileText size={20} />, label: 'Articles' },
    { path: '/admin/magazines', icon: <BookOpen size={20} />, label: 'Magazines' },
    { path: '/admin/categories', icon: <Tags size={20} />, label: 'Categories' },
    { path: '/admin/media', icon: <ImageIcon size={20} />, label: 'Media Library' },
    { path: '/admin/newsletter', icon: <Mail size={20} />, label: 'Newsletter' },
    { path: '/admin/subscribers', icon: <Users size={20} />, label: 'Subscribers' },
    { path: '/admin/messages', icon: <MessageSquare size={20} />, label: 'Contact Messages' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="admin-sidebar-header">
        ASTROSPACIOUS
      </div>
      
      <nav className="admin-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin/dashboard'}
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-nav" style={{ flex: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.05)', padding: '16px' }}>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
          onClick={onClose}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        
        <button 
          className="admin-nav-item" 
          style={{ width: '100%', background: 'transparent', border: '1px solid transparent', cursor: 'pointer', textAlign: 'left', outline: 'none' }}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
