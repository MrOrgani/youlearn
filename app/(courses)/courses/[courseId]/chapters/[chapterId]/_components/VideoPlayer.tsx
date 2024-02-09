"use client";

import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, LockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface VideoPlayerProps {
  title: string;
  isStarted: boolean;
  courseId: string;
  playbackId: string;
  isBlocked: boolean;
  isCompleted: boolean;
  chapterId: string;
  prevChapterId: string | null;
  nextChapterId: string | null;
}

export const VideoPlayer = ({
  chapterId,
  courseId,
  isBlocked,
  nextChapterId,
  playbackId,
  title,
}: VideoPlayerProps) => {
  const router = useRouter();
  const [readyToPlay, setReadyToPlay] = useState(false);

  const onEnded = async () => {
    try {
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/progress`,
        {
          isFinished: true,
        },
      );

      if (!nextChapterId) {
        toast.success("Chapter completed");
        return;
      }
      if (nextChapterId) {
        toast.success("Chapter completed");
        router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className=" relative  aspect-video">
      {!readyToPlay && !isBlocked && (
        <div className=" absolute inset-0 flex items-center justify-center bg-slate-700">
          <Loader2 size={20} className="animate-spin text-secondary" />
        </div>
      )}
      {isBlocked && (
        <div className=" absolute inset-0 flex  flex-col items-center  justify-center gap-y-2 bg-slate-700  text-secondary">
          <LockIcon size={20} />
          <p className="text-sm">
            You must purchase this course to access this chapter
          </p>
        </div>
      )}
      {!isBlocked && (
        <MuxPlayer
          title={title}
          onCanPlay={() => setReadyToPlay(true)}
          className={`${readyToPlay ? "block" : "hidden"}`}
          onEnded={onEnded}
          autoPlay={true}
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
