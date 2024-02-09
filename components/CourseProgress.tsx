import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  value: number;
  size?: "xsmall" | "small";
  variant?: "default" | "finished";
}

export const CourseProgress = ({ value, size }: CourseProgressProps) => {
  return (
    <div className="flex flex-col items-center">
      <Progress
        className={`h-1 w-full`}
        value={value}
        barColor={value === 100 ? "bg-emerald-700" : "bg-[#FF0000]"}
      />
      <p
        className={`mt-1 ${
          size === "small" ? "text-sm" : "text-xl"
        } font-medium text-whitef1 `}
      >
        {Math.round(value)}%
      </p>
    </div>
  );
};
