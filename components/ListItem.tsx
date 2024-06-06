import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

type ListItemProps = {
  image: string;
  name: string;
  href: string;
};

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  return (
    <Link
      href={href}
      className="
        relative
        rounded-md
        overflow-hidden 
      bg-neutral-100/10
        hover:bg-neutral-100/20
        transition
        group
        flex
        items-center
        pr-4
        space-x-4
        mt-4
      "
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image alt="image" src={image} fill className="object-cover" />
      </div>
      <p className="truncate font-medium py-5">{name}</p>
      <div
        className="
        absolute
        right-5
        flex
        items-center
        justify-center
        opacity-0
        group-hover:opacity-100
        bg-green-500
        rounded-full
        p-4
        hover:scale-110
        transition
      "
      >
        <FaPlay className="text-black" />
      </div>
    </Link>
  );
};

export default ListItem;
