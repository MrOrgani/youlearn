import { Category, Course } from "@prisma/client";
import { db } from "../db";
import { getProgress } from "./getProgress";

type CourseWithProgress = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export const getUserCourses = async ({ userId }: { userId: string }) => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchasedCourses.map(
      (purchasedCourse) => purchasedCourse.course,
    ) as unknown as CourseWithProgress[];

    for (const course of courses) {
      course["progress"] = await getProgress({
        userId,
        courseId: course.id,
      });
    }
    return courses;
  } catch (error) {
    console.log("[GET_PURCHASED_COURSES]", error);
    return [];
  }
};
