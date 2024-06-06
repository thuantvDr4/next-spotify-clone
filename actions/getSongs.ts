"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongs = async (): Promise<any> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });
  const { error, data } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.log("----get songs-error", error);
  }
  return data || [];
};

export default getSongs;
