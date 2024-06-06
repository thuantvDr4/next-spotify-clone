"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const useModal = useAuthModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();

  const onLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    //TODO: reste any playing songs
    router.refresh();
    toast.success("Logout success");
    if (error) {
      console.log("---", error);
    }
  };

  const gotoProfile = () => {
    router.push("/account");
  };

  return (
    <div
      className={twMerge(
        `
  h-fit
  w-full
  bg-gradient-to-b
  from-emerald-800
  p-6
  flex
  flex-col
  `,
        className
      )}
    >
      <div className="flex flex-row items-center justify-between">
        {/* ----- */}
        <div className="space-x-2 hidden md:flex">
          <button className="bg-black rounded-full hover:opacity-75 transition">
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button className="bg-black rounded-full hover:opacity-75 transition">
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        {/* --home & search- */}
        <div className="flex md:hidden space-x-4">
          <button className="bg-white rounded-full hover:opacity-75 transition p-2">
            <HiHome size={20} className="text-neutral-800" />
          </button>
          <button className="bg-white rounded-full hover:opacity-75 transition p-2">
            <BiSearch size={20} className="text-neutral-800" />
          </button>
        </div>

        {/* ---login & signup */}
        {user ? (
          <div className="flex space-x-4 items-center">
            <div>
              <Button
                onClick={onLogout}
                className="
                     bg-white
                   text-black
                     font-bold
                     px-6
                     py-2
           "
              >
                Log out
              </Button>
            </div>
            <div>
              <Button
                onClick={gotoProfile}
                className="bg-green-500
           "
              >
                <FaUserAlt />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex space-x-4 items-center">
            <div>
              <Button
                onClick={useModal.onOpen}
                className="
                    bg-transparent
                  text-white
                    font-medium
          "
              >
                Sign up
              </Button>
            </div>
            <div>
              <Button
                onClick={useModal.onOpen}
                className="
          bg-white
          px-6
          py-2
          "
              >
                Sign in
              </Button>
            </div>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default Header;
