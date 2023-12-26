import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();
    const { courseId, chapterId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isOwner = await db.course.findUnique({
      where: { id: courseId, userId },
    });

    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: { id: chapterId, courseId },
    });

    if (!chapter) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    const muxData = await db.muxData.findUnique({
      where: { chapterId: chapter.id },
    });

    if (
      !chapter.description ||
      !chapter.title ||
      !chapter.videoUrl ||
      !muxData ||
      !chapter
    ) {
      return new NextResponse("Chapter not ready", { status: 400 });
    }

    const updatedChapter = await db.chapter.update({
      where: { id: chapterId },
      data: { isPublished: !chapter.isPublished },
    });

    if (!updatedChapter.isPublished) {
      const course = await db.chapter.findMany({
        where: { courseId, isPublished: true },
      });
      if (!course.length) {
        await db.course.update({
          where: { id: courseId },
          data: { isPublished: false },
        });
      }
    }

    return NextResponse.json(updatedChapter);
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
}
