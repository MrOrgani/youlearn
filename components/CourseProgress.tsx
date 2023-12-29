import { Progress } from "@/components/ui/progress";
import React from "react";

interface CourseProgressProps {
  value: number;
  size?: "xsmall" | "small";
  variant?: "default" | "finished";
}

export const CourseProgress = ({ value, size }: CourseProgressProps) => {
  return (
    <div>
      <Progress
        className={`h-2 `}
        value={value}
        barColor={value === 100 ? "bg-emerald-700" : "bg-sky-700"}
      />
      <p
        className={`${value === 100 ? "text-emerald-700" : "text-sky-700"} ${
          size === "xsmall" ? "text-xs" : "text-sm"
        }`}
      >
        {Math.round(value)}% complete
      </p>
    </div>
  );
};
