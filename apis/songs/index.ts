import { useMutation, useQuery } from "@tanstack/react-query";
import { useSessionContext } from "@supabase/auth-helpers-react";

// useInsertSong
export const useInsertSong = () => {
  const { supabaseClient } = useSessionContext();
  return useMutation({
    async mutationFn(data: {
      userId: string;
      title: string;
      author: string;
      imageFile: any;
      songFile: any;
      uuId: string;
    }) {
      // upload song file
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${data.title}-${data.uuId}`, data.songFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (songError) {
        throw new Error("Failed song upload");
      }

      //---upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("images")
          .upload(`image-${data.title}-${data.uuId}`, data.imageFile, {
            cacheControl: "3600",
            upsert: false,
          });

      if (imageError) {
        throw new Error("Failed image upload");
      }
      //insert to database
      const { error: supabaseError, data: supabaseData } = await supabaseClient
        .from("songs")
        .insert({
          user_id: data.userId,
          title: data?.title,
          author: data?.author,
          image_path: imageData?.path,
          song_path: songData?.path,
        });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }
      return supabaseData;
    },
  });
};

//---get song by id
export const useGetSongById = (id?: string) => {
  const { supabaseClient } = useSessionContext();
  return useQuery({
    queryKey: ["songs", { id }],
    async queryFn() {
      if (!id) {
        throw new Error("the song is not found");
      }
      const { error, data } = await supabaseClient
        .from("songs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
