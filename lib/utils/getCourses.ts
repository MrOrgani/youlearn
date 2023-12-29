import { Category, Course } from "@prisma/client";
import { db } from "../db";
import { getProgress } from "./getProgress";

interface GetCoursesProps {
  userId: string;
  title?: string;
  category?: string;
}
type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

export const getCourses = async ({
  title,
  category,
  userId,
}: GetCoursesProps) => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId: category,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
        },
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          const progress = await getProgress({ userId, courseId: course.id });
          return {
            ...course,
            progress,
          };
        }),
      );

    return coursesWithProgress;
  } catch (e) {
    console.log("[GET_COURSES]", e);
    return [];
  }
};
