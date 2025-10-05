import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronDown, ChevronRight, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { type NavItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface HierarchicalSidebarProps {
  navigation: NavItem[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onNavigate?: () => void;
}

function NavItemComponent({
  item,
  level = 0,
  activeTab,
  onTabChange,
  onNavigate
}: {
  item: NavItem;
  level?: number;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onNavigate?: () => void;
}) {
  const [location, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(level < 1); // Top level items open by default
  
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;
  
  const isActive = item.tab 
    ? item.tab === activeTab 
    : item.href === location;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    } else {
      if (item.tab && onTabChange) {
        onTabChange(item.tab);
      } else if (item.href) {
        navigate(item.href);
      }
      if (onNavigate) {
        onNavigate();
      }
    }
  };

  const paddingLeft = `${level * 0.75 + 1}rem`;

  return (
    <div>
      <button
        onClick={handleClick}
        className={cn(
          "w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
          isActive && !hasChildren
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
            : level === 0
            ? "text-slate-900 hover:bg-slate-100"
            : "text-slate-700 hover:bg-slate-50"
        )}
        style={{ paddingLeft }}
        data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && (
            <Icon 
              className={cn(
                "h-4 w-4 flex-shrink-0",
                isActive && !hasChildren ? "text-white" : "text-slate-600"
              )} 
            />
          )}
          <span className={cn(
            "truncate",
            level === 0 && "font-semibold"
          )}>
            {item.title}
          </span>
          {item.badge && (
            <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
              {item.badge}
            </span>
          )}
        </div>
        {hasChildren && (
          <div className="flex-shrink-0">
            {isOpen ? (
              <ChevronDown className="h-4 w-4 text-slate-400" />
            ) : (
              <ChevronRight className="h-4 w-4 text-slate-400" />
            )}
          </div>
        )}
      </button>
      
      {hasChildren && isOpen && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child, index) => (
            <NavItemComponent
              key={index}
              item={child}
              level={level + 1}
              activeTab={activeTab}
              onTabChange={onTabChange}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function HierarchicalSidebar({
  navigation,
  activeTab,
  onTabChange,
  onNavigate
}: HierarchicalSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const [, navigate] = useLocation();

  const handleLogout = async () => {
    try {
      const response = await apiRequest("POST", "/api/logout", {});
      if (response.ok) {
        navigate("/login");
        toast({
          title: "Logged out successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Logout failed",
        variant: "destructive",
      });
    }
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    if (onNavigate) {
      onNavigate();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-slate-200"
        data-testid="mobile-menu-button"
      >
        {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-72 bg-white border-r border-slate-200 shadow-sm flex flex-col",
          "fixed lg:static inset-y-0 left-0 z-40",
          "transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Pivotal B2B
          </h1>
          <p className="text-xs text-slate-600 mt-1">Admin Dashboard</p>
        </div>

        {/* Navigation Menu */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {navigation.map((item, index) => (
              <NavItemComponent
                key={index}
                item={item}
                activeTab={activeTab}
                onTabChange={onTabChange}
                onNavigate={closeSidebar}
              />
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start gap-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100"
            data-testid="logout-button"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </>
  );
}
