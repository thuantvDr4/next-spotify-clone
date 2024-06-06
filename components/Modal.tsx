"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  title: string;
  description?: string;
  isOpen: boolean;
  onChange: (open: boolean) => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onChange,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} defaultOpen={isOpen} onOpenChange={onChange}>
      <Dialog.Overlay
        className="
      bg-neutral-900/90
        backdrop-blur-sm
        fixed
        inset-0
        z-[999]
       
      "
      >
        <Dialog.Content
          className="
                fixed
                top-[50%]
                left-[50%]
                translate-x-[-50%]
                translate-y-[-50%]
                max-h-full
                md:h-auto
                md:max-h-[85vh]
                w-full
                md:w-[90vw]
                md:max-w-[450px]
                p-[25px]
                drop-shadow-md
                border
                border-neutral-700
                bg-neutral-800
                focus:outline-none
                rounded-md
        "
        >
          <Dialog.Title
            className="
            text-xl
            text-center
            mb-4
          "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
            text-sm
            leading-normal
            mb-5
            text-center
          "
          >
            {description}
          </Dialog.Description>
          <div>{children}</div>

          <Dialog.Close asChild>
            <button
              className="
              fixed
              top-[10px]
              right-[10px]
               text-neutral-400
                hover:text-white
                w-[25px]
                h-[25px]
                rounded-full
                inline-flex
                items-center
                justify-center
                focus:outline-none
                appearance-none
            "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Root>
  );
};

export default Modal;
