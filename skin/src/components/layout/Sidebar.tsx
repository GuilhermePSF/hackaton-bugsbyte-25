import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Wallet, 
  BarChart4,
  PlusCircle,
  Settings, 
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
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="flex flex-col h-screen border-r border-gray-200 bg-white w-64">
      <div className="flex items-center p-4">
        <div className="text-xl font-bold text-uphold-primary">MyFB</div>
      </div>

      <div className="flex-grow overflow-y-auto p-2">
        <nav className="space-y-1">
          <NavItem
            to="/dashboard"
            icon={<Home size={20} />}
            label="Dashboard"
            active={pathname === "/dashboard"}
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
            <AvatarImage src="https://imgs.search.brave.com/bMVcSZUoOszhYORcayqMlnnt9ceUnnng1r56EEogs0c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvOTA4/MzAzL3Bob3RvL2Fj/dG9yLW1hdHRoZXct/cGVycnktc3RhcnMt/YXMtY2hhbmRsZXIt/YmluZy1pbi1uYmNz/LWNvbWVkeS1zZXJp/ZXMtZnJpZW5kcy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/UWFHaUtyTkgzOUVw/Qnh3eWFXWmE3dndu/VWNHdmh4c3BCX19O/ZENoTVAtOD0" alt="User" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Chandler Bing</span>
            <span className="text-xs text-muted-foreground">chandler.bing@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
