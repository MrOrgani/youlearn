import { Separator } from "@/components/ui/separator";
import { SidebarRoutes } from "./SidebarRoutes";

export const Sidebar = () => {
  return (
    <div className="flex h-full flex-col space-y-2 overflow-y-auto bg-background">
      <div className="flex w-full flex-col  bg-background py-4 ">
        <SidebarRoutes />
        <Separator orientation="horizontal" className="my-3 bg-background20" />
      </div>
    </div>
  );
};
