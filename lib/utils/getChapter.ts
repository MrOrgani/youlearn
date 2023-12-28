import { Attachement, Chapter, MuxData } from ".prisma/client";
import { db } from "../db";

interface GetChapterProps {
  chapterId: string;
  userId: string;
  courseId: string;
}

export const getChapter = async ({
  chapterId,
  courseId,
  userId,
}: GetChapterProps) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      select: {
        price: true,
      },
    });
    if (!course) {
      throw new Error("Course not found");
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });
    if (!chapter) {
      throw new Error("Chapter not found");
    }

    let muxData: MuxData | null = null;
    let attachements: Attachement[] = [];
    let prevChapter: Chapter | null = null;
    let nextChapter: Chapter | null = null;

    if (purchase) {
      attachements = await db.attachement.findMany({
        where: {
          courseId,
        },
      });
    }

    if (purchase || chapter.isFree) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId,
        },
      });

      prevChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            lt: chapter?.position,
          },
        },
      });
      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
      });
    }
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      progress: userProgress || null,
      nextChapterId: nextChapter?.id || null,
      prevChapterId: prevChapter?.id || null,
      muxData,
      userProgress,
      attachements,
      purchase,
      course,
    };
  } catch (err) {
    console.log("[Get_Chapter]", err);
    return {
      chapter: null,
      progress: 0,
      nextChapterId: null,
      prevChapterId: null,
      muxData: null,
      userProgress: null,
      attachements: [],
      purchase: null,
      course: null,
    };
  }
};
