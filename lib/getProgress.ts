import { db } from "./db";

export const getProgress = async (userId: string, courseId: string) => {
  try {
    const progressOnCourses = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
    });

    const chapterIds = progressOnCourses.map((chapter) => chapter.id);

    const completedChapters = await db.userProgress.findMany({
      where: {
        userId,
        chapterId: {
          in: chapterIds,
        },
        isCompleted: true,
      },
    });

    const percentageCompletedChapter = Math.round(
      (completedChapters.length / progressOnCourses.length) * 100,
    );

    return percentageCompletedChapter;
  } catch (e) {
    console.log("[GET_PROGRESS]", e);
    return 0;
  }
};
