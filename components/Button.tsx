import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading = false,
      className,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={twMerge(
          `
    rounded-full 
    w-full 
    bg-green-500
    border
    border-transparent
    px-3
    py-3
    disabled:cursor-not-allowed
    disabled:opacity-50
    text-black
    font-bold
    transition
    hover:opacity-75
    `,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <div
            aria-label="Loading..."
            role="status"
            className="flex justify-center items-center space-x-2"
          >
            <svg
              className="h-8 w-8 animate-spin stroke-gray-600"
              viewBox="0 0 256 256"
            >
              <line
                x1="128"
                y1="32"
                x2="128"
                y2="64"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="195.9"
                y1="60.1"
                x2="173.3"
                y2="82.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="224"
                y1="128"
                x2="192"
                y2="128"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="195.9"
                y1="195.9"
                x2="173.3"
                y2="173.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="128"
                y1="224"
                x2="128"
                y2="192"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="60.1"
                y1="195.9"
                x2="82.7"
                y2="173.3"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="32"
                y1="128"
                x2="64"
                y2="128"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
              <line
                x1="60.1"
                y1="60.1"
                x2="82.7"
                y2="82.7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              ></line>
            </svg>
            <span className="text-base font-medium text-gray-600">
              Loading ...
            </span>
          </div>
        )}
        {!loading && children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
