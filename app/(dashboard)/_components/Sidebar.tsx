import React from "react";
import { SidebarRoutes } from "./SidebarRoutes";
import { Separator } from "@/components/ui/separator";

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col overflow-y-auto bg-background">
      <div className="flex w-full flex-col bg-background">
        <SidebarRoutes />
        <Separator orientation="horizontal" className="bg-background20" />
      </div>
    </div>
  );
};
