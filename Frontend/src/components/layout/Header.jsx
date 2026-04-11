import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, PanelLeftClose, PanelLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export function Header({ isOpen, onToggleSidebar, theme, onToggleTheme }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAuthAction = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    await logout();
    navigate('/');
  };

  return (
    <header className="h-14 flex-shrink-0 flex items-center justify-between px-4 border-b border-border bg-surface">
      {/* Left */}
      <div className="flex items-center gap-3 min-w-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          aria-label={isOpen ? 'Collapse sidebar' : 'Open sidebar'}
          title={isOpen ? 'Collapse sidebar' : 'Open sidebar'}
        >
          {isOpen
            ? <PanelLeftClose size={17} />
            : <PanelLeft size={17} />
          }
        </Button>

      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAuthAction}
          aria-label={user ? 'Logout' : 'Login'}
          title={user ? 'Logout' : 'Login'}
        >
          {user ? 'Logout' : 'Login'}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleTheme}
          aria-label="Toggle light/dark mode"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark'
            ? <Sun size={16} />
            : <Moon size={16} />
          }
        </Button>
      </div>
    </header>
  );
}
