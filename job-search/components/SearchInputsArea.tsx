"use client";

import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

interface Props {
  submitSearch: (keywords: string) => Promise<void>;
}

const SearchInputsArea = ({ submitSearch }: Props) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchClick = () => {
    submitSearch(searchInput);
    setSearchInput("");
  };

  return (
    <div className="w-full h-full flex gap-1 items-center">
      <Input
        value={searchInput}
        isClearable
        radius="sm"
        placeholder="Search for job listings..."
        onValueChange={(value) => setSearchInput(value)}
        className="w-2/3"
        classNames={{
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-900/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-lg",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focus=true]:bg-default-200/50",
            "dark:group-data-[focus=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        startContent={
          <Image
            src="/search-icon.svg"
            alt="search"
            height="0"
            width="0"
            sizes="100vw"
            className="h-4 w-4"
          />
        }
      />

      <Button
        size="md"
        className="ml-auto bg-gradient-to-br from-purple-500 to-orange-300 text-white font-medium disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed"
        disabled={!searchInput}
        onClick={handleSearchClick}
      >
        search
      </Button>
    </div>
  );
};

export default SearchInputsArea;
