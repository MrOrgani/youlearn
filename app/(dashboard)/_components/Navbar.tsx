import React from "react";
import { MobileSidebar } from "./MobileSidebar";
import { NavbarRoutes } from "@/components/NavbarRoutes";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between  bg-background p-2 shadow-sm">
      <div className=" flex  min-w-max">
        <MobileSidebar />
        <Logo />
      </div>
      <NavbarRoutes />
    </div>
  );
};
