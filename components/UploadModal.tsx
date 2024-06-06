"use client";
import React, { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useInsertSong } from "@/apis/songs";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const router = useRouter();
  const { reset, register, handleSubmit } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      song: null,
      image: null,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const { mutate: insertSong, isPending: isAdding } = useInsertSong();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }
      //- insert song
      insertSong(
        {
          title: values?.title,
          author: values?.author,
          imageFile: imageFile,
          songFile: songFile,
          uuId: uniqid(),
          userId: user.id,
        },
        {
          onSuccess: () => {
            router.refresh();
            reset();
            toast.success("insert song success");
            uploadModal.onClose();
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Upload a song"
      description="Upload description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
      flex flex-col
      space-y-4
      "
      >
        <Input
          id="title"
          {...register("title", { required: true })}
          placeholder="Song title"
          disabled={isLoading || isAdding}
        />

        <Input
          id="author"
          {...register("author", { required: true })}
          placeholder="Song author"
          disabled={isLoading || isAdding}
        />

        {/* --file song */}
        <div>
          <h5 className="pb-1">Select a song file</h5>
          <Input
            id="song"
            type="file"
            accept=".mp3"
            {...register("song", { required: true })}
            disabled={isLoading || isAdding}
          />
        </div>

        {/* --file image */}
        <div>
          <h5 className="pb-1">Select a image</h5>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            disabled={isLoading || isAdding}
          />
        </div>
        <Button
          loading={isLoading || isAdding}
          type="submit"
          disabled={isLoading || isAdding}
        >
          {isAdding || isLoading ? "Creating ..." : "Create"}
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
