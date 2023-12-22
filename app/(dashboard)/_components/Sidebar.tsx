import React from "react";
import { SidebarRoutes } from "./SidebarRoutes";
import { Logo } from "./Logo";

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-white">
      <div className="p-6 ">
        <Logo />
      </div>
      <div className="flex w-full flex-col">
        <SidebarRoutes />
      </div>
    </div>
  );
};
