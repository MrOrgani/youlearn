"use client";

import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  disabled: boolean;
  isPublished: boolean;
  courseId: string;
  chapterId: string;
}

export const ChapterActions = ({
  disabled,
  isPublished,
  courseId,
  chapterId,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLaoding, setisLaoding] = useState(false);
  const onConfirmDelete = async () => {
    try {
      setisLaoding(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);
      toast.success("Chapter deleted");
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    } finally {
      setisLaoding(false);
      router.refresh();
    }
  };

  const publishChapter = async () => {
    try {
      setisLaoding(true);
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/publish`,
        {
          isPublished: !isPublished,
        },
      );
      toast.success("Chapter updated");
      router.push(`/teacher/courses/${courseId}`);
    } catch (error) {
      console.log("error", error);
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
