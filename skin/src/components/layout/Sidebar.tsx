
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Wallet, 
  BarChart4,
  PlusCircle,
  Settings, 
  Menu, 
  ChevronLeft, 
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  to: string;
  onClick?: () => void;
};

const NavItem = ({ icon, label, active, to, onClick }: NavItemProps) => {
  return (
    <Link to={to} className="w-full">
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal h-12",
          active ? "bg-uphold-light text-uphold-primary font-medium" : "hover:bg-gray-100"
        )}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </Button>
    </Link>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r border-gray-200 bg-white transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="text-xl font-bold text-uphold-primary">Uphold</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-grow overflow-y-auto p-2">
        <nav className="space-y-1">
          <NavItem
            to="/"
            icon={<Home size={20} />}
            label="Dashboard"
            active={pathname === "/"}
          />
          <NavItem
            to="/wallet"
            icon={<Wallet size={20} />}
            label="My Wallet"
            active={pathname === "/wallet"}
          />
          <NavItem
            to="/etfs"
            icon={<BarChart4 size={20} />}
            label="ETFs"
            active={pathname === "/etfs" || pathname.startsWith("/etfs/")}
          />
          {/* Cards, Transactions, and Analytics items are hidden, not deleted */}
        </nav>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <nav className="space-y-1">
            <NavItem
              to="/add-funds"
              icon={<PlusCircle size={20} />}
              label="Add Funds"
              active={pathname === "/add-funds"}
            />
            <NavItem
              to="/settings"
              icon={<Settings size={20} />}
              label="Settings"
              active={pathname === "/settings"}
            />
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john.doe@example.com</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
