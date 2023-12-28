"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import React from "react";

interface CourseEnrollmentButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollmentButton = ({
  courseId,
  price,
}: CourseEnrollmentButtonProps) => {
  return (
    <Button className="w-full md:w-auto">
      Get this course for {formatPrice(price)}
    </Button>
  );
};
