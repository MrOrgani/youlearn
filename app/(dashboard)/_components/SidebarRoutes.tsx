"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./SidebarItem";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  { icon: Compass, label: "Browse", href: "/search" },
];
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  { icon: BarChart, label: "Analytics", href: "/teacher/analytics" },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacher = pathname.includes("/teacher");

  const routes = isTeacher ? teacherRoutes : guestRoutes;

  return (
    <div className="flex w-full flex-col  bg-background">
      {routes.map((route) => {
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
