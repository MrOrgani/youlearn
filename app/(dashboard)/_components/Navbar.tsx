import React from "react";
import { MobileSidebar } from "./MobileSidebar";
import { NavbarRoutes } from "@/components/NavbarRoutes";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="flex h-full items-center border-b bg-background p-4 shadow-sm">
      <div className="p-6 ">
        <Logo />
      </div>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
