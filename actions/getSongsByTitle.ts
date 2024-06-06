"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<any> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    const allSongs = await getSongs();
    return allSongs;
  }

  const { error, data } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });
  if (error) {
    console.log("----get songs-error", error);
  }
  return data || [];
};

export default getSongsByTitle;
