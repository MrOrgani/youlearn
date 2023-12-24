"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File, Loader2, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachement, Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/FileUpload";

interface AttachementFormProps {
  initialData: Course & { attachement: Attachement[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachementForm = ({
  initialData,
  courseId,
}: AttachementFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachements`, values);
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await axios.delete(`/api/courses/${courseId}/attachements/${id}`);
      toast.success("Attachement deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Course attachement
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add an file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {!initialData.attachement.length && (
            <p className="mt-2 text-sm italic text-muted-foreground">
              No attachement added yet
            </p>
          )}
          {initialData.attachement.length > 0 && (
            <div className="space-y-2">
              {initialData.attachement.map((attachement) => (
                <div
                  className="flex w-full items-center rounded-md border border-sky-200 bg-sky-100 p-3 text-sky-700"
                  key={attachement.id}
                >
                  <File className="mr-2 h-4 w-4 flex-shrink-0" />
                  <a
                    className="line-clamp-1 text-xs underline"
                    href={attachement.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {attachement.name}
                  </a>
                  {deletingId === attachement.id ? (
                    <div>
                      <Loader2 className="h-4 w-4 animate-spin"></Loader2>
                    </div>
                  ) : (
                    <button
                      className="hove:opacity-50 ml-auto transition-opacity"
                      onClick={() => onDelete(attachement.id)}
                    >
                      <X className="h-4 w-4"></X>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url });
              }
            }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            All extra files you want to share with your students
          </div>
        </div>
      )}
    </div>
  );
};
