import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import { CourseSidebarChapter } from "./CourseSidebarChapter";
import { CourseProgress } from "@/components/CourseProgress";

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
        <h1 className="text-whitef1 font-bold">{course.title}</h1>
        {purchasedCourse && (
          <div className="mt-10">
            <CourseProgress value={progress} />
          </div>
        )}
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
