"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseFinishedButtonProps {
  isFinished?: boolean;
  courseId: string;
  chapterId: string;
  nextChapterId?: string | null;
}

export const CourseFinishedButton = ({
  isFinished,
  courseId,
  chapterId,
  nextChapterId,
}: CourseFinishedButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);

      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isFinished: !isFinished,
        },
      );

      if (!isFinished && nextChapterId) {
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }

      toast.success(
        isFinished
          ? "You have marked this chapter as unfinished"
          : "You have marked this chapter as finished",
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      router.refresh();
      setLoading(false);
    }
  };
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      type="button"
      variant={isFinished ? "outline" : "default"}
      className={`auto
      ${isFinished ? "" : " bg-emerald-600 text-white hover:bg-emerald-600/80"}
      w-full md:w-auto
      `}
    >
      {isFinished ? "Mark as not finished" : "Mark as finished"}
      {isFinished ? (
        <XCircle className="ml-2 h-4 w-4" />
      ) : (
        <CheckCircle className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
};
