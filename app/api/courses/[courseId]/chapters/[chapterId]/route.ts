import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { isPublished, ...values } = await req.json();

    const isOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...values,
      },
    });

    if (values.videoUrl) {
      const existinVideo = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      if (existinVideo) {
        if (await Video.Assets.get(existinVideo.assetId)) {
          await Video.Assets.del(existinVideo.assetId);
        }
        await db.muxData.delete({
          where: {
            id: existinVideo.id,
          },
        });
      }

      const video = await Video.Assets.create({
        input: values.videoUrl,
        playback_policy: "public",
        test: false,
      });

      await db.muxData.create({
        data: {
          assetId: video.id,
          playbackId: video.playback_ids?.[0].id,
          chapterId: params.chapterId,
        },
      });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { chapterId, courseId },
  }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
    });

    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        courseId,
      },
    });

    if (!chapter) {
      return new NextResponse("Not found", { status: 404 });
    }

    if (chapter.videoUrl) {
      const muxData = await db.muxData.findFirst({
        where: {
          chapterId,
        },
      });

      if (muxData) {
        await Video.Assets.del(muxData.assetId);
        await db.muxData.delete({
          where: {
            id: muxData.id,
          },
        });
      }
    }

    const publishedCourse = await db.course.findMany({
      where: {
        id: courseId,
        isPublished: true,
      },
    });

    // If there are no more chapters, unpublish the course
    if (publishedCourse.length === 0) {
      await db.course.update({
        where: {
          id: courseId,
        },
        data: {
          isPublished: false,
        },
      });
    }

    const deletedChapter = await db.chapter.delete({
      where: {
        id: chapterId,
      },
    });

    return NextResponse.json(deletedChapter);
  } catch (error) {
    console.log("[Chapter_ID] error", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
