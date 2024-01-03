"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoryItemProps {
  name: string;
  value?: string;
  icon?: LucideIcon;
}

export const CategoryItem = ({
  name,
  value,
  icon: Icon,
}: CategoryItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category");
  const titleFromUrl = searchParams.get("title");

  const isCurrentCategory = value === categoryFromUrl;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          category: isCurrentCategory ? null : value,
          title: titleFromUrl,
        },
      },
      { skipNull: true, skipEmptyString: true },
    );
    router.push(url);
  };
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-x-1 rounded-xl ${
        isCurrentCategory
          ? "bg-white text-background"
          : " hover:bg-background20  bg-white/10 text-primary"
      } my-3 h-8  px-3  text-sm transition-all`}
      type="button"
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{name}</div>
    </button>
  );
};
