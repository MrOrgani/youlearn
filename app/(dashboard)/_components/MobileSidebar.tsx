import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import { Sidebar } from "./Sidebar";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className={"pr-4 transition hover:opacity-75 md:hidden"}>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className={"background p-0"}>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
