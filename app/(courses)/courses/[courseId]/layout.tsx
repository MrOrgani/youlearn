import { db } from "@/lib/db";
import { getProgress } from "@/lib/utils/getProgress";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { CourseSidebar } from "./_components/CourseSidebar";
import { CourseNavbar } from "./_components/CourseNavbar";

const Courselayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const course = await db.course.findUnique({
    where: { id: params.courseId },
    include: {
      chapters: {
        where: { isPublished: true },
        include: {
          userProgress: {
            where: { userId },
          },
        },
        orderBy: { position: "asc" },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const progress = await getProgress({ userId, courseId: params.courseId });

  return (
    <div className=" h-full">
      <div className="fixed inset-y-0 z-50 h-[56px] w-full md:pl-80">
        <CourseNavbar course={course} progress={progress} />
      </div>
      <div className="fixed inset-y-0 z-50  hidden h-full w-24 flex-col md:flex">
        <CourseSidebar course={course} progress={progress}></CourseSidebar>
      </div>
      <main className=" h-full pt-[56px] md:pl-24">{children}</main>
    </div>
  );
};

export default Courselayout;
