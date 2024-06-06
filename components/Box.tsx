import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Box = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        `
    bg-neutral-900
    rounded-lg
    h-fit
    w-full    
  `,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Box;