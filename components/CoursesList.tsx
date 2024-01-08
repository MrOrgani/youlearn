import { Category, Course } from "@prisma/client";
import { CourseCard } from "../app/(dashboard)/(routes)/search/_components/CourseCard";

interface CourseListProps {
  courses: Array<
    Course & {
      category: Category | null;
      chapters: { id: string }[];
      progress: number | null;
    }
  >;
}

export const CoursesList = ({ courses }: CourseListProps) => {
  return (
    <div>
      <div className="grid gap-4 p-2 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => {
          return (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              category={course.category?.name}
              nbOfchapters={course.chapters.length}
              progress={course.progress ?? 0}
              imageSrc={course.imageUrl ?? ""}
              price={course.price ?? 0}
            />
          );
        })}
      </div>
      {courses.length === 0 && (
        <div className="text-center text-gray-500">No courses exisiting</div>
      )}
    </div>
  );
};
