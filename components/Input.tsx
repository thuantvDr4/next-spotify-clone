import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `
            flex
            w-full
            px-3
            py-3
            rounded-md
            focus:outline-none
            border
            border-transparent
            bg-neutral-700
            text-sm
            file:border-0
            file:bg-transparent
            file:font-medium
            file:text-sm
            placeholder:text-neutral-400
            disabled:cursor-not-allowed
            disabled:opacity-50
            `,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
