import { CoursesList } from "@/components/CoursesList";
import { getUserCourses } from "@/lib/utils/getUserCourses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) return redirect("/");
  const courses = await getUserCourses({ userId });
  return (
    <div className="space-y-4 p-2">
      <CoursesList courses={courses} />
    </div>
  );
}
