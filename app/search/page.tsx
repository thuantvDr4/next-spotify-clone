import getSongsByTitle from "@/actions/getSongsByTitle";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import React from "react";
import SearchContent from "./components/SearchContent";

type SearchProps = {
  searchParams: {
    title: string;
  };
};

const SearchPage = async ({ searchParams }: SearchProps) => {
  //TODO get songs by search
  const songs = await getSongsByTitle(searchParams?.title);
  return (
    <div
      className="
        bg-neutral-900
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
    "
    >
      <Header className="from-bg-neutral-900">
        <div>
          <h1 className="text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>

      <SearchContent songs={songs} />
    </div>
  );
};

export default SearchPage;
