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
        `flex items-center gap-x-2 pl-6 text-sm font-[500] text-slate-500 transition-all hover:bg-slate-300/20 hover:text-slate-600`,
        isActive &&
          "bg-sky-200/20 text-sky-700  hover:bg-sky-200/20 hover:text-sky-700",
        isChapterCompleted &&
          "bg-emerald-200/20 text-emerald-700  hover:bg-emerald-200/20 hover:text-emerald-700",
      )}
    >
      <div className="flex items-center gap-x-2 py-4 ">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-sky-700",
            isChapterCompleted && "text-emerald-700",
          )}
        />
        {chapter.title}
      </div>
      <div
        className={cn(
          "ml-auto h-full border-2 border-r-slate-700 opacity-0 transition-all",
          isActive && "opacity-100",
          isChapterCompleted && "border-r-emerald-700",
        )}
      ></div>
    </button>
  );
};
