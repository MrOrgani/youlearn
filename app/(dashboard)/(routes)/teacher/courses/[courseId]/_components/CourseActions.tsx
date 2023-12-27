"use client";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
}

export const CourseActions = ({
  disabled,
  isPublished,
  courseId,
}: CourseActionsProps) => {
  const router = useRouter();
  const [isLaoding, setisLaoding] = useState(false);
  const onConfirmDelete = async () => {
    try {
      setisLaoding(true);
      await axios.delete(`/api/courses/${courseId}`);
      toast.success("Chapter deleted");
      router.push(`/teacher/courses`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setisLaoding(false);
      router.refresh();
    }
  };

  const publishChapter = async () => {
    try {
      setisLaoding(true);
      isPublished
        ? await axios.patch(`/api/courses/${courseId}/unpublish`)
        : await axios.patch(`/api/courses/${courseId}/publish`);
      toast.success("Course deleted");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setisLaoding(false);
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={publishChapter}
        disabled={disabled || isLaoding}
        variant={"outline"}
        size={"sm"}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onConfirmDelete}>
        <Button disabled={isLaoding} onClick={() => {}} size={"sm"}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
