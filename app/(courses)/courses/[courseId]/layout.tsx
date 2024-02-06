import { db } from "@/lib/db";
import { getProgress } from "@/lib/utils/getProgress";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { CourseNavbar } from "./_components/CourseNavbar";
import { CourseSidebar } from "./_components/CourseSidebar";

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
    <div className=" h-full ">
      <div className="fixed inset-y-0 z-50 h-[56px] w-full px-4">
        <CourseNavbar course={course} progress={progress} />
      </div>
      <div className="fixed inset-y-0 z-50 mt-[56px]  hidden h-full w-56 flex-col md:flex">
        <CourseSidebar course={course} progress={progress}></CourseSidebar>
      </div>
      <main className=" h-full pt-[56px] md:pl-56">{children}</main>
    </div>
  );
};

export default Courselayout;
