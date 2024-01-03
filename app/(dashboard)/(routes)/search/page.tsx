import { db } from "@/lib/db";
import React from "react";
import { Categories } from "./_components/Categories";
import { getCourses } from "@/lib/utils/getCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CoursesList } from "../../../../components/CoursesList";
import { SearchInput } from "@/components/SearchInput";

interface SearchPageProps {
  searchParams: {
    category: string;
    lookingFor: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const courses = await getCourses({
    userId,
    title: searchParams.lookingFor,
    category: searchParams.category,
  });

  return (
    <>
      <div className=" block px-6 pt-6 md:mb-0 md:hidden">
        <SearchInput />
      </div>
      <div className="">
        <Categories items={categories}></Categories>
        <CoursesList courses={courses}></CoursesList>
      </div>
    </>
  );
};

export default SearchPage;
