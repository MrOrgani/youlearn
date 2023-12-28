"use client";

import MuxPlayer from "@mux/mux-player-react";
import { Loader2, LockIcon } from "lucide-react";
import { useState } from "react";

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
  isCompleted,
  isStarted,
  nextChapterId,
  playbackId,
  prevChapterId,
  title,
  videoUrl,
}: VideoPlayerProps) => {
  const [readyToPlay, setReadyToPlay] = useState(false);
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
          onEnded={() => {}}
          autoPlay={true}
          playbackId={playbackId}
        />
      )}
    </div>
  );
};
