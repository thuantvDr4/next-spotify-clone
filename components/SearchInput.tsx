"use client";
import React, { useEffect, useState } from "react";
import qs from "query-string";
import { useRouter } from "next/navigation";

import Input from "./Input";
import useDebounce from "@/hooks/useDebounce";

const SearchInput = () => {
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const debounceValue = useDebounce(value);

  useEffect(() => {
    const query = {
      title: debounceValue,
    };
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });
    // Todo: push to url
    router.push(url);
  }, [debounceValue, router]);

  return (
    <div
      className="
    mt-4
  "
    >
      <Input
        value={value}
        placeholder="what do you want to play!"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
