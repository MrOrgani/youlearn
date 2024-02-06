"use client";

import { BarChart, Compass, Layout, List } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./SidebarItem";

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
    <div className="bg-backgroun2 flex w-full  flex-col space-y-2 px-2">
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
