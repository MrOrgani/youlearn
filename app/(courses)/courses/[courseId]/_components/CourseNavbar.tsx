import { NavbarRoutes } from "@/components/NavbarRoutes";
import { Chapter, Course, UserProgress } from "@prisma/client";
import React from "react";
import { CourseMobileSidebar } from "./CourseMobileSidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: Array<Chapter & { userProgress: UserProgress[] | null }>;
  };
  progress: number;
}

export const CourseNavbar = ({ course, progress }: CourseNavbarProps) => {
  return (
    <div className=" flex h-full items-center border-b bg-white p-4 shadow-sm">
      <CourseMobileSidebar course={course} progress={progress} />
      <NavbarRoutes />
    </div>
  );
};
