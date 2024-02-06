import React from "react";
import { Navbar } from "./_components/Navbar";
import { Sidebar } from "./_components/Sidebar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-full">
      <div className="fixed  z-50 h-[56px] w-full ">
        <Navbar />
      </div>
      <div className="fixed bottom-0 hidden h-full w-56 flex-col  pt-[56px] md:flex">
        <Sidebar />
      </div>
      <main className="h-full pt-[56px] md:pl-56 ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
