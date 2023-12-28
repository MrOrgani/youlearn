import { Banner } from "@/components/Banner";
import { getChapter } from "@/lib/utils/getChapter";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import { VideoPlayer } from "./_components/VideoPlayer";
import { CourseEnrollmentButton } from "./_components/CourseEnrollmentButton";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/Preview";
import { File } from "lucide-react";

const ChapterPage = async ({
  params,
}: {
  params: {
    courseId: string;
    chapterId: string;
  };
}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const {
    chapter,
    progress,
    nextChapterId,
    prevChapterId,
    muxData,
    userProgress,
    attachements,
    purchase,
    course,
  } = await getChapter({
    chapterId: params.chapterId,
    courseId: params.courseId,
    userId,
  });

  if (!chapter || !course) {
    return redirect("/");
  }

  const isBlocked = !purchase && !chapter.isFree;
  const isStarted = !!purchase && !userProgress?.isCompleted;
  const isCompleted = !!purchase && userProgress?.isCompleted;

  return (
    <div>
      {isBlocked && (
        <Banner label="You need to purchase this course to access this chapter" />
      )}
      {isCompleted && <Banner label={"You have finished this chapter"} />}
      <div className="mx-auto flex max-w-4xl flex-col pb-20">
        <div className="p-4">
          <VideoPlayer
            title={chapter.title}
            isStarted={isStarted}
            courseId={params.courseId}
            playbackId={muxData?.playbackId ?? ""}
            isBlocked={isBlocked}
            isCompleted={isCompleted ?? false}
            chapterId={params.chapterId}
            prevChapterId={prevChapterId}
            nextChapterId={nextChapterId}
          />
        </div>
        <div>
          <div className="flex flex-col items-center justify-between p-4 md:flex-row">
            <h2 className="mb-2 text-2xl font-semibold">{chapter.title}</h2>
            {purchase ? (
              // <CourseProgressButton
              //   chapterId={params.chapterId}
              //   courseId={params.courseId}
              //   nextChapterId={nextChapter?.id}
              //   isCompleted={!!userProgress?.isCompleted}
              //   />
              <CourseEnrollmentButton
                courseId={params.courseId}
                price={course.price!}
              />
            ) : (
              <CourseEnrollmentButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <div>
            <Preview value={chapter.description ?? ""} />
          </div>
          {Boolean(attachements?.length) && (
            <>
              <Separator />
              <div className="p-4">
                {attachements?.map((attachement) => (
                  <a
                    key={attachement.id}
                    href={attachement.url}
                    target="_blank"
                    className=" flex w-full items-center rounded-md border bg-sky-200 to-sky-700 p-3 hover:underline"
                    rel="noreferrer"
                  >
                    <File />
                    <p className="line-clamp-1">{attachement.name}</p>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChapterPage;
