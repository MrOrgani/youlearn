import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { CourseSidebarChapter } from "./CourseSidebarChapter";

interface CourseSidebarProps {
  course: Course & {
    chapters: Array<Chapter & { userProgress: UserProgress[] | null }>;
  };
  progress: number;
}

export const CourseSidebar = async ({
  course,
  progress,
}: CourseSidebarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const purchasedCourse = await db.purchase.findUnique({
    where: { userId_courseId: { userId, courseId: course.id } },
  });

  return (
    <div className=" flex h-full flex-col overflow-y-auto border-r shadow-sm">
      <div className="flex flex-col border-b p-8">
        <h1 className="font-bold">{course.title}</h1>
      </div>
      <div className="flex w-full flex-col">
        {course.chapters.map((chapter) => {
          return (
            <CourseSidebarChapter
              key={chapter.id}
              chapter={chapter}
              isPurchased={!!purchasedCourse}
            />
          );
        })}
      </div>
    </div>
  );
};
