"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import React from "react";

interface CourseEnrollmentButtonProps {
  courseId: string;
  price: number;
}

export const CourseEnrollmentButton = ({
  courseId,
  price,
}: CourseEnrollmentButtonProps) => {
  const [loading, setLoading] = React.useState(false);

  const handleEnroll = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(res.data.url);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  return (
    <Button
      onClick={handleEnroll}
      disabled={loading}
      className="w-full md:w-auto"
    >
      Get this course for {formatPrice(price)}
    </Button>
  );
};
