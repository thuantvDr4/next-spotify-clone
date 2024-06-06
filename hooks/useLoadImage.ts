import { Song } from "@/typings";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadImage = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return null;
  }
  const { data: imageData, error } = supabaseClient.storage
    .from("images")
    .getPublicUrl(song?.image_path);

  if (error) {
    console.log("----load image error", error);
    return null;
  }
  return imageData?.publicUrl;
};

export default useLoadImage;
