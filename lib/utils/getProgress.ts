import { db } from "../db";

export const getProgress = async ({
  userId,
  courseId,
}: {
  userId: string;
  courseId: string;
}) => {
  try {
    const publishedChapters = await db.chapter.findMany({
      where: {
        courseId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });
    console.log(
      "🚀 ~ file: getProgress.ts:14 ~ getProgress ~ publishedChapters:",
      publishedChapters,
      courseId,
    );

    const chapterIds = publishedChapters.map((chapter) => chapter.id);

    const completedChapters = await db.userProgress.count({
      where: {
        userId,
        chapterId: {
          in: chapterIds,
        },
        isCompleted: true,
      },
    });

    const percentageCompletedChapter =
      chapterIds.length > 0 ? (completedChapters / chapterIds.length) * 100 : 0;

    return percentageCompletedChapter;
  } catch (e) {
    console.log("[GET_PROGRESS]", e);
    return 0;
  }
};
