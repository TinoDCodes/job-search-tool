"use client";

import { Input, Divider } from "@nextui-org/react";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/16/solid";
import { CustomButton } from "./custom/CustomButton";
import { useRouter } from "next/navigation";

const SearchInputsArea = () => {
  const router = useRouter();

  const [searchInput, setSearchInput] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/search?keywords=${searchInput}${
        locationInput && `&location=${locationInput}`
      }`
    );

    setSearchInput("");
    setLocationInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] flex items-center gap-1 lg:gap-3 rounded-full shadow-md bg-[#eeeeee] dark:bg-white/10 px-1 py-2 lg:p-3"
    >
      {/*--------------- KEYWORDS INPUT ---------------*/}
      <Input
        value={searchInput}
        isClearable
        placeholder="Search for job listings..."
        onValueChange={(value) => setSearchInput(value.trimStart())}
        className="w-6/12"
        classNames={{
          input: [
            "bg-transparent dark:bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:font-medium placeholder:text-default-900/50 dark:placeholder:text-white/60",
            "hover:bg-transparent",
          ],
          innerWrapper: "bg-transparent dark:bg-transparent",
          inputWrapper: [
            "bg-transparent",
            "dark:bg-transparent",
            "hover:bg-transparent",
            "dark:hover:bg-transparent",
            "group-data-[focus=true]:bg-transparent",
            "dark:group-data-[focus=true]:bg-transparent",
            "shadow-none",
            "!cursor-text",
          ],
        }}
        startContent={
          <MagnifyingGlassIcon
            strokeWidth={2}
            className="text-zinc-500/65 dark:text-white/85 h-6 w-6"
          />
        }
      />

      <Divider orientation="vertical" className="h-8" />

      {/*--------------- LOCATION INPUT ---------------*/}
      <Input
        value={locationInput}
        isClearable
        placeholder="Location..."
        onValueChange={(value) => setLocationInput(value.trimStart())}
        className="w-5/12 md:w-4/12"
        classNames={{
          input: [
            "bg-transparent dark:bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:font-medium placeholder:text-default-900/50 dark:placeholder:text-white/60",
            "hover:bg-transparent",
          ],
          innerWrapper: "bg-transparent dark:bg-transparent",
          inputWrapper: [
            "bg-transparent",
            "dark:bg-transparent",
            "hover:bg-transparent",
            "dark:hover:bg-transparent",
            "group-data-[focus=true]:bg-transparent",
            "dark:group-data-[focus=true]:bg-transparent",
            "shadow-none",
            "!cursor-text",
          ],
        }}
        startContent={
          <MapPinIcon className="text-zinc-500/65 dark:text-white/85 h-6 w-6" />
        }
      />

      {/*--------------- SEARCH BUTTON ---------------*/}
      <CustomButton
        color="teal"
        className="hidden md:block text-base ml-auto md:mr-1 rounded-full w-2/12 disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed"
        disabled={!searchInput.trim()}
        type="submit"
      >
        Search
      </CustomButton>
      <CustomButton
        isIconOnly
        color="teal"
        disabled={!searchInput.trim()}
        type="submit"
        className="md:hidden rounded-full mr-1 disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed"
      >
        <MagnifyingGlassIcon strokeWidth={3} className="h-5 w-5" />
      </CustomButton>
    </form>
  );
};

export default SearchInputsArea;
