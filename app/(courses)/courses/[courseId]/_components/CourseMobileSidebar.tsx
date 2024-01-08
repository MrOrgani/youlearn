import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React from "react";
import { CourseSidebar } from "./CourseSidebar";
import { Course, Chapter, UserProgress } from "@prisma/client";

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: Array<Chapter & { userProgress: UserProgress[] | null }>;
  };
  progress: number;
}

export const CourseMobileSidebar = ({
  course,
  progress,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className={"pr-4 transition hover:opacity-75 md:hidden"}>
        <Menu className=" text-white" />
      </SheetTrigger>
      <SheetContent side={"left"} className={"background p-0"}>
        <CourseSidebar course={course} progress={progress} />
      </SheetContent>
    </Sheet>
  );
};
