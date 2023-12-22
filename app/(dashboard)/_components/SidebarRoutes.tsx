"use client";

import { Compass, Layout } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  { icon: Compass, label: "Browse", href: "/search" },
];

export const SidebarRoutes = () => {
  return (
    <div className="flex w-full flex-col">
      {guestRoutes.map((route) => {
        return (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={route.href}
          />
        );
      })}
    </div>
  );
};
