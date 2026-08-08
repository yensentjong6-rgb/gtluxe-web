"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  FolderTree,
  ShoppingCart,
  Users,
  BookOpen,
  Globe,
  Settings,
} from "lucide-react";

const menus = [
  {
    name: "Dashboard",
    href: "/dunkin",
    icon: LayoutDashboard,
  },
  
  {
    name: "Products",
    href: "/dunkin/products",
    icon: Package,
  },
  {
  name: "Brands",
  href: "/dunkin/brands",
  icon: Tags,
},
  {
    name: "Categories",
    href: "/dunkin/categories",
    icon: FolderTree,
  },
  {
    name: "Orders",
    href: "/dunkin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Customers",
    href: "/dunkin/customers",
    icon: Users,
  },
  {
    name: "Knowledge Base",
    href: "/dunkin/knowledge",
    icon: BookOpen,
  },
  {
    name: "Website",
    href: "/dunkin/website",
    icon: Globe,
  },
  {
    name: "Settings",
    href: "/dunkin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        GTLUXE CMS
      </h1>

      <nav className="space-y-2">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                pathname === menu.href
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
              {menu.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}