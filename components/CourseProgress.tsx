import { Progress } from "@/components/ui/progress";
import React from "react";

interface CourseProgressProps {
  value: number;
  size?: "xsmall" | "small";
  variant?: "default" | "finished";
}

export const CourseProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <Progress
        className={`h-2 `}
        value={value}
        barColor={variant === "finished" ? "bg-emerald-700" : "bg-sky-700"}
      />
      <p
        className={`${
          variant === "finished" ? "text-emerald-700" : "text-sky-700"
        } ${size === "xsmall" ? "text-xs" : "text-sm"}`}
      >
        {Math.round(value)}% complete
      </p>
    </div>
  );
};
