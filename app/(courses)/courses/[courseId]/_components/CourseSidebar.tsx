import { CourseProgress } from "@/components/CourseProgress";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
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
    <div className=" flex h-full flex-col overflow-y-auto  shadow-sm">
      <div className="flex flex-col p-8">
        <h1 className="text-xl font-bold text-whitef1">{course.title}</h1>
        {purchasedCourse && (
          <div className="mt-10">
            <CourseProgress value={progress} />
          </div>
        )}
      </div>
      <Separator orientation="horizontal" className="my-3 bg-background20" />
      <div className="flex w-full flex-col gap-y-2 p-4">
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
