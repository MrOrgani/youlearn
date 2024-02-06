import { NavbarRoutes } from "@/components/NavbarRoutes";
import { Logo } from "./Logo";
import { MobileSidebar } from "./MobileSidebar";

export const Navbar = () => {
  return (
    <div className="flex w-full items-center justify-between  bg-background p-2 px-4 shadow-sm">
      <div className=" flex  min-w-max">
        <MobileSidebar />
        <Logo />
      </div>
      <NavbarRoutes />
    </div>
  );
};
