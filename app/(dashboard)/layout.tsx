import React from "react";
import { Sidebar } from "./_components/Sidebar";
import { Navbar } from "./_components/Navbar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="h-full">
      <div className="fixed inset-x-0 z-50 h-[80px] w-full md:pl-56">
        <Navbar />
      </div>
      <div className="fixed bottom-0 top-0 hidden h-full w-56 flex-col md:flex">
        <Sidebar />
      </div>
      <main className="h-full md:pl-56 ">{children}</main>
    </div>
  );
};

export default DashboardLayout;
