import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  {
    params: { courseId, attachementId },
  }: { params: { courseId: string; attachementId: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const isOwner = await db.course.findUnique({
      where: { id: courseId, userId: userId },
    });

    if (!isOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedAttachement = await db.attachement.delete({
      where: { courseId, id: attachementId },
    });

    return NextResponse.json(deletedAttachement);
  } catch (error) {
    return new NextResponse("Internal error" + error, { status: 500 });
  }
}
