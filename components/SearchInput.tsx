"use client";

import qs from "query-string";

import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "./hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";

export const SearchInput = () => {
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 500);

  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category");

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/search",
        query: { category, lookingFor: debouncedValue },
      },
      { skipEmptyString: true, skipNull: true },
    );
    router.push(url);
  }, [debouncedValue, category, router]);

  return (
    <div className=" relative">
      <Search className=" absolute left-3 top-3 h-4 w-4 animate-pulse to-sky-600 " />
      <Input
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-md bg-slate-100 py-1.5 pl-8 text-slate-800"
        placeholder="Search for courses"
        value={value}
      />
    </div>
  );
};
