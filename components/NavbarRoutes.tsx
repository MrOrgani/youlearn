"use client";

import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname.startsWith("/teacher");
  const isCoursePage = pathname.startsWith("/courses");
  return (
    <>
      <div className={" flex gap-x-2"}>
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button
              size={"sm"}
              variant={"secondary"}
              className=" bg-background20 text-whitef1"
            >
              <LogOut className={"mr-2 h-4 w-4"} />
              Exit
            </Button>
          </Link>
        ) : (
          <Link href={"/teacher/courses"}>
            <Button size={"sm"} variant={"secondary"}>
              Teacher Mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
