"use client";
import React, { useEffect, useMemo, useState } from "react";
import SidebarItem from "./SidebarItem";
import Box from "./Box";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { usePathname } from "next/navigation";
import LibrarySongs from "./LibrarySongs";
import { Song } from "@/typings";
import getSongById from "@/actions/getSongsById";

type SidebarProps = {
  children: React.ReactNode;
};

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const pathname = usePathname();
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchUserSongs = async () => {
      const userSongs = await getSongById();
      setSongs(userSongs);
    };

    fetchUserSongs();
  }, []);

  const routes = useMemo(() => {
    return [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search",
        href: `/`,
      },
      {
        icon: BiSearch,
        label: "Search",
        active: pathname === "/search",
        href: `/search`,
      },
    ];
  }, [pathname]);

  return (
    <div className="flex h-full">
      <div
        className="
        hidden
        md:flex
        flex-col
        gap-y-2
        h-auto
        w-[300px]
        p-2
        "
      >
        <Box>
          {routes.map((item) => (
            <SidebarItem {...item} key={item.label} />
          ))}
        </Box>
        <Box className="overflow-y-auto h-full">
          <LibrarySongs songs={songs} />
        </Box>
      </div>

      <main className="w-full overflow-y-auto h-full flex-1 py-2">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
