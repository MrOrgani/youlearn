import { CourseProgress } from "@/components/CourseProgress";
import { IconBadge } from "@/components/IconBadge";
import { formatPrice } from "@/lib/format";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CourseCardProps {
  id: string;
  title: string;
  category: string | undefined;
  nbOfchapters: number;
  progress: number;
  imageSrc: string;
  price: number;
}

export const CourseCard = ({
  id,
  title,
  category,
  nbOfchapters,
  progress,
  imageSrc,
  price,
}: CourseCardProps) => {
  return (
    <Link href={`/courses/${id}`}>
      <div className="groupe h-full overflow-hidden rounded-lg border p-1 transition hover:shadow-sm">
        <div className=" relative aspect-video w-full overflow-hidden rounded-md ">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
          <span className="text-whitef1 absolute bottom-0 right-0 m-1 rounded bg-background p-1 text-xs opacity-80">
            {nbOfchapters} {nbOfchapters === 1 ? "Chapter" : "Chapters"}
          </span>
        </div>
        <CourseProgress value={progress} size="small" />
        <div className="flex flex-col p-2">
          <div className=" text-whitef1 line-clamp-2 text-base font-medium transition group-hover:text-sky-700  md:text-base">
            {title}
          </div>
          <p className="text-whitef1 text-xs ">{category}</p>
          {progress !== null ? null : (
            <p className="text-md text-slate-700 md:text-sm">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
