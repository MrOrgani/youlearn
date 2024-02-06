"use client";
import { cn } from "@/lib/utils";
import { Chapter, UserProgress } from "@prisma/client";
import { CheckCircle2, LockIcon, PlayIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface CourseSidebarChapterProps {
  chapter: Chapter & { userProgress: UserProgress[] | null };
  isPurchased: boolean;
}

export const CourseSidebarChapter = ({
  chapter,
  isPurchased,
}: CourseSidebarChapterProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isChapterCompleted = chapter.userProgress?.[0]?.isCompleted;
  const lockedChapter = !chapter.isFree && !isPurchased;
  const Icon = lockedChapter
    ? LockIcon
    : isChapterCompleted
      ? CheckCircle2
      : PlayIcon;

  const isActive =
    pathname === `/courses/${chapter.courseId}/chapters/${chapter.id}`;
  const onClick = () => {
    router.push(`/courses/${chapter.courseId}/chapters/${chapter.id}`);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        `flex items-center gap-x-2 rounded-md pl-6 text-sm font-[500]  text-primary transition-all  hover:bg-background20 `,
        isActive && " bg-background20",
      )}
    >
      <div className="flex items-center gap-x-2 py-4 ">
        <Icon
          size={22}
          className={cn("text-primary transition-all  hover:bg-background20")}
        />
        {chapter.title}
      </div>
      <div
        className={cn(
          "ml-auto h-full opacity-0 transition-all",
          isActive && "opacity-100",
        )}
      ></div>
    </button>
  );
};
