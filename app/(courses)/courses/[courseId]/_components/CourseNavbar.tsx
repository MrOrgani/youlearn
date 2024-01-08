import { NavbarRoutes } from "@/components/NavbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import { CourseMobileSidebar } from "./CourseMobileSidebar";
import { Logo } from "@/app/(dashboard)/_components/Logo";

interface CourseNavbarProps {
  course: Course & {
    chapters: Array<Chapter & { userProgress: UserProgress[] | null }>;
  };
  progress: number;
}

export const CourseNavbar = ({ course, progress }: CourseNavbarProps) => {
  return (
    <div className="background  flex h-full w-full items-center justify-between  p-4 shadow-sm">
      <div className=" flex  min-w-max">
        <CourseMobileSidebar course={course} progress={progress} />
        <Logo />
      </div>
      <NavbarRoutes />
    </div>
  );
};
