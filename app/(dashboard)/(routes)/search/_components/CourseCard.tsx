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
      <div className="groupe h-full overflow-hidden rounded-lg border p-3 transition hover:shadow-sm">
        <div className=" relative aspect-video w-full overflow-hidden rounded-md">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>
        <div className="flex flex-col p-2">
          <div className=" line-clamp-2 text-lg font-medium transition group-hover:text-sky-700 md:text-base ">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className=" my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className=" flex items-center gap-x-1 to-sky-200">
              <IconBadge icon={BookOpen} size={"sm"} />
              <span>
                {nbOfchapters} {nbOfchapters === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {progress > 0 ? (
            <div>Progress: {progress}%</div>
          ) : (
            <p className="text-md text-slate-700 md:text-sm">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
