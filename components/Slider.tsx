"use client";
import React from "react";
import * as RadxiSlider from "@radix-ui/react-slider";

type SliderProp = {
  value?: number;
  onChange?: (value: number) => void;
};

const Slider: React.FC<SliderProp> = ({ value, onChange }) => {
  const handleOnchange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };
  return (
    <RadxiSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      onValueChange={handleOnchange}
      max={1}
      step={0.1}
      aria-label="Volune"
    >
      <RadxiSlider.Track className="bg-neutral-600 relative rounded-full h-[3px] grow">
        <RadxiSlider.Range className="absolute bg-white rounded-full h-full" />
      </RadxiSlider.Track>
    </RadxiSlider.Root>
  );
};

export default Slider;
