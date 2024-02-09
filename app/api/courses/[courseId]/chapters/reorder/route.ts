import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { list } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
    });

    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    for (const chapter of list) {
      await db.chapter.update({
        where: {
          id: chapter.id,
        },
        data: {
          position: chapter.position,
        },
      });
    }

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("[REORDER] error", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
