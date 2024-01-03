"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    pathname === href ||
    (pathname === "/" && href === "/") ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        `hover:bg-background20 flex h-10 items-center gap-x-2 rounded-xl  text-sm font-[500]  text-primary transition-all `,
        isActive && " bg-background20",
      )}
    >
      <div className="flex items-center gap-x-2 px-3 ">
        <Icon size={20} className={cn("", isActive && "")} />
        {label}
      </div>
    </button>
  );
};
