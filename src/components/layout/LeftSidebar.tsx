import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  ShoppingCart,
  Package,
  Users2,
  LineChart,
  ChevronLeft,
  ChevronRight,
  Package2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isCollapsed }) => {
  const commonClasses =
    'flex items-center gap-4 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary';
  
  const activeClasses = 'bg-sidebar-accent text-sidebar-accent-foreground';

  const linkContent = (
    <>
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && <span className="truncate">{label}</span>}
    </>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(commonClasses, isActive && activeClasses)
            }
          >
            {linkContent}
          </NavLink>
        </TooltipTrigger>
        {isCollapsed && (
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

interface LeftSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  console.log('LeftSidebar loaded');

  const navItems = [
    { to: '/', icon: Home, label: 'Dashboard' },
    { to: '/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/products', icon: Package, label: 'Products' },
    { to: '/customers', icon: Users2, label: 'Customers' },
    { to: '/analytics', icon: LineChart, label: 'Analytics' },
  ];

  return (
    <aside
      className={cn(
        'hidden border-r bg-sidebar border-sidebar-border md:flex md:flex-col transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-4 lg:h-[68px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-sidebar-primary-foreground">
          <Package2 className="h-6 w-6" />
          {!isCollapsed && <span className="">ShopSphere</span>}
        </NavLink>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4 py-4">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed}
            />
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-sidebar-border">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="w-full flex justify-center gap-2 text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent">
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
      </div>
    </aside>
  );
};

export default LeftSidebar;