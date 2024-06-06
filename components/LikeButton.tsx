"use client";
import React, { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import { Router } from "next/router";

type LikeButtonProps = {
  songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter();
  const { user } = useUser();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    //
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();
      if (!error && data) {
        setIsLiked(true);
      }
    };
    // excute
    fetchData();
  }, [user?.id, supabase, songId]);

  const handleLike = async () => {
    if (!user?.id) {
      return authModal.onOpen();
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user?.id)
        .eq("song_id", songId);

      if (error) {
        toast.error(error?.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        user_id: user.id,
        song_id: songId,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked!");
      }
    }
    router.refresh();
  };

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;
  return (
    <button
      onClick={handleLike}
      className="
        hover:opacity-75
        transition
        px-3
    "
    >
      <Icon color={isLiked ? "#22c55e" : "white"} size={25} />
    </button>
  );
};

export default LikeButton;
