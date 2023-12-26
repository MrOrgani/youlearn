import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { courseId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const course = await db.course.findUnique({
      where: {
        id: courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse("Not Found", {
        status: 404,
      });
    }

    if (
      !course.title ||
      !course.description ||
      !course.chapters.some((chapter) => chapter.muxData) ||
      !course.imageUrl ||
      !course.categoryId
    ) {
      return new NextResponse("Missing element to publish this course", {
        status: 400,
      });
    }

    const updatedCourse = await db.course.update({
      where: {
        id: courseId,
      },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    console.log("[COURSE_ID_Publish]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
