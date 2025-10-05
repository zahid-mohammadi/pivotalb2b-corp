import {
  LayoutDashboard,
  Users,
  Settings,
  Lock,
  Key,
  BarChart3,
  TrendingUp,
  DollarSign,
  Target,
  LineChart,
  FileText,
  BookOpen,
  FileCheck,
  Layout,
  UserPlus,
  Workflow,
  Building,
  UserCircle,
  MessageSquare,
  Mail,
  Newspaper,
  GitBranch,
  Zap,
  ListChecks,
  Receipt,
  CreditCard,
  Wallet,
  Package,
  PieChart
} from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  icon?: any;
  roles?: string[]; // If empty, visible to all roles
  children?: NavItem[];
  badge?: string;
  tab?: string; // For dashboard tabs
}

export const navigationConfig: NavItem[] = [
  {
    title: "Admin Dashboard",
    icon: LayoutDashboard,
    roles: ["admin"],
    children: [
      {
        title: "System Overview",
        href: "/dashboard",
        tab: "analytics",
        icon: LayoutDashboard,
        roles: ["admin"]
      },
      {
        title: "User Management",
        href: "/dashboard",
        tab: "users",
        icon: Users,
        roles: ["admin"]
      },
      {
        title: "Settings",
        icon: Settings,
        roles: ["admin"],
        children: [
          {
            title: "General",
            href: "/admin/settings/general",
            icon: Settings,
            roles: ["admin"]
          },
          {
            title: "Integrations",
            href: "/admin/settings/integrations",
            icon: GitBranch,
            roles: ["admin"]
          },
          {
            title: "Security",
            href: "/admin/settings/security",
            icon: Lock,
            roles: ["admin"]
          }
        ]
      },
      {
        title: "API Keys & Webhooks",
        href: "/admin/api-keys",
        icon: Key,
        roles: ["admin"]
      }
    ]
  },
  {
    title: "Analytics",
    icon: BarChart3,
    roles: [], // Available to all
    children: [
      {
        title: "Dashboard Analytics",
        href: "/dashboard",
        tab: "analytics",
        icon: BarChart3,
        roles: []
      },
      {
        title: "Campaign Performance",
        href: "/analytics/campaigns",
        icon: TrendingUp,
        roles: ["admin", "marketing"]
      },
      {
        title: "Sales & Pipeline Reports",
        href: "/analytics/pipeline",
        icon: Target,
        roles: ["admin", "sales", "marketing"]
      },
      {
        title: "Financial Reports",
        href: "/analytics/finance",
        icon: DollarSign,
        roles: ["admin", "finance"]
      },
      {
        title: "Engagement Insights",
        href: "/analytics/engagement",
        icon: LineChart,
        roles: ["admin", "sales", "marketing"]
      },
      {
        title: "Custom Reports",
        href: "/analytics/custom",
        icon: PieChart,
        roles: []
      }
    ]
  },
  {
    title: "Marketing Content",
    icon: FileText,
    roles: ["admin", "marketing"],
    children: [
      {
        title: "Blog Posts",
        href: "/dashboard",
        tab: "blog",
        icon: FileText,
        roles: ["admin", "marketing"]
      },
      {
        title: "eBooks / Guides",
        href: "/dashboard",
        tab: "ebooks",
        icon: BookOpen,
        roles: ["admin", "marketing"]
      },
      {
        title: "Case Studies",
        href: "/dashboard",
        tab: "case-studies",
        icon: FileCheck,
        roles: ["admin", "marketing"]
      },
      {
        title: "Landing Pages",
        href: "/content/landing-pages",
        icon: Layout,
        roles: ["admin", "marketing"]
      },
      {
        title: "Content Performance",
        href: "/content/performance",
        icon: TrendingUp,
        roles: ["admin", "marketing"]
      }
    ]
  },
  {
    title: "Lead & Pipeline Management",
    icon: UserPlus,
    roles: ["admin", "sales", "marketing"],
    children: [
      {
        title: "Leads",
        href: "/dashboard",
        tab: "leads",
        icon: UserPlus,
        roles: ["admin", "sales", "marketing"]
      },
      {
        title: "Pipeline",
        href: "/dashboard",
        tab: "pipeline",
        icon: Workflow,
        roles: ["admin", "sales"]
      },
      {
        title: "Accounts",
        href: "/accounts",
        icon: Building,
        roles: ["admin", "sales"]
      },
      {
        title: "Contacts",
        href: "/contacts",
        icon: UserCircle,
        roles: ["admin", "sales"]
      },
      {
        title: "Proposals",
        href: "/dashboard",
        tab: "proposals",
        icon: MessageSquare,
        roles: ["admin", "sales"]
      }
    ]
  },
  {
    title: "Campaigns & Automation",
    icon: Mail,
    roles: ["admin", "marketing", "sales"],
    children: [
      {
        title: "Email Campaigns",
        href: "/dashboard",
        tab: "pipeline-campaigns",
        icon: Mail,
        roles: ["admin", "marketing", "sales"]
      },
      {
        title: "Automation Rules",
        href: "/dashboard",
        tab: "pipeline-automation",
        icon: Zap,
        roles: ["admin", "marketing", "sales"]
      },
      {
        title: "Microsoft 365 Integration",
        href: "/dashboard",
        tab: "pipeline-integrations",
        icon: GitBranch,
        roles: ["admin", "marketing", "sales"]
      }
    ]
  },
  {
    title: "Billing & Accounting",
    icon: Receipt,
    roles: ["admin", "finance"],
    children: [
      {
        title: "Invoices & Estimates",
        href: "/dashboard",
        tab: "billing",
        icon: Receipt,
        roles: ["admin", "finance"]
      },
      {
        title: "Expenses & Bills",
        href: "/billing/expenses",
        icon: CreditCard,
        roles: ["admin", "finance"]
      },
      {
        title: "Payments & Receipts",
        href: "/billing/payments",
        icon: Wallet,
        roles: ["admin", "finance"]
      },
      {
        title: "Products & Services",
        href: "/billing/catalog",
        icon: Package,
        roles: ["admin", "finance"]
      },
      {
        title: "Reports",
        href: "/billing/reports",
        icon: PieChart,
        roles: ["admin", "finance"]
      }
    ]
  }
];

// Helper function to check if user has access to a nav item
export function hasAccess(item: NavItem, userRole?: string): boolean {
  if (!item.roles || item.roles.length === 0) {
    return true; // Available to all
  }
  if (!userRole) {
    return false; // No role provided
  }
  return item.roles.includes(userRole);
}

// Helper function to filter navigation based on user role
export function getFilteredNavigation(userRole?: string): NavItem[] {
  return navigationConfig
    .filter(item => hasAccess(item, userRole))
    .map(item => ({
      ...item,
      children: item.children
        ?.filter(child => hasAccess(child, userRole))
        .map(child => ({
          ...child,
          children: child.children?.filter(subChild => hasAccess(subChild, userRole))
        }))
    }));
}
