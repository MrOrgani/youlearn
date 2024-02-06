import { SearchInput } from "@/components/SearchInput";
import { db } from "@/lib/db";
import { getCourses } from "@/lib/utils/getCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CoursesList } from "../../../../components/CoursesList";
import { Categories } from "./_components/Categories";

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
      <div className="space-y-2 px-4">
        <Categories items={categories}></Categories>
        <div className=" block p-2  md:mb-0 ">
          <SearchInput />
        </div>
        <CoursesList courses={courses}></CoursesList>
      </div>
    </>
  );
};

export default SearchPage;
