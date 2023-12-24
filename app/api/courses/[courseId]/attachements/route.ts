import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params: { courseId } }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();
    const { url } = await request.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isOwner = await db.course.findUnique({
      where: { id: courseId, userId: userId },
    });

    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const attachement = await db.attachement.create({
      data: {
        url,
        name: url.split("/").pop(),
        courseId,
      },
    });

    return NextResponse.json(attachement);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
