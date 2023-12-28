import { Progress } from "@/components/ui/progress";
import React from "react";

interface CourseProgressProps {
  value: number;
  size?: "small" | "medium" | "large";
}

export const CourseProgress = ({ value }: CourseProgressProps) => {
  return (
    <div>
      <Progress className="h-2" value={value} />
      <p>{Math.round(value)}% complete</p>
    </div>
  );
};
