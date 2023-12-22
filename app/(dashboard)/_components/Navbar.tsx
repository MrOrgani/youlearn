import React from "react";
import { MobileSidebar } from "./MobileSidebar";
import { NavbarRoutes } from "@/components/NavbarRoutes";

export const Navbar = () => {
  return (
    <div className="flex h-full items-center border-b bg-white p-4 shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
