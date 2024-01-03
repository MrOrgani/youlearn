import React from "react";
import { SidebarRoutes } from "./SidebarRoutes";

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto border-r bg-background">
      <div className="flex w-full flex-col bg-background">
        <SidebarRoutes />
      </div>
    </div>
  );
};
