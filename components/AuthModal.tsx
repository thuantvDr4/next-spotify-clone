"use client";
import React, { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import {
  useSupabaseClient,
  useSessionContext,
} from "@supabase/auth-helpers-react";
import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const { session } = useSessionContext();
  const router = useRouter();
  const { isOpen, onClose } = useAuthModal();

  useEffect(() => {
    if (!!session) {
      router.refresh();
      onClose();
    }
  }, [session]);

  return (
    <Modal
      isOpen={isOpen}
      title="Welcome back"
      description="Login your account"
      onChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <Auth
        providers={[]}
        theme="dark"
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
