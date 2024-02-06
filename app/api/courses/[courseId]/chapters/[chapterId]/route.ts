import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { NextResponse } from "next/server";

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET!,
);

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    console.log("PATCH", params);
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
    console.log("PATCH isOwner", isOwner);

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
    console.log("PATCH chapter", chapter);

    console.log("PATCH values.videoUrl", values.videoUrl);
    if (values.videoUrl) {
      const existinVideo = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });

      console.log("PATCH existinVideo", existinVideo);
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
      console.log("PATCH video", video);

      await db.muxData.create({
        data: {
          assetId: video.id,
          playbackId: video.playback_ids?.[0].id,
          chapterId: params.chapterId,
        },
      });
    }

    console.log("PATCH video", chapter);
    return NextResponse.json(chapter);
  } catch (error) {
    console.log("[Chapter_ID] error", error);
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
