"use client";

import { LinkedInJob } from "@/app/api/linkedin/scraper";
import { Input, Button, Divider } from "@nextui-org/react";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/16/solid";
import { CustomButton } from "./custom/CustomButton";

const SearchInputsArea = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [locationInput, setLocationInput] = useState<string>("");

  const [loadingJobs, setLoadingJobs] = useState<boolean>(false);
  const [linkedInData, setLinkedInData] = useState<LinkedInJob[] | null>(null);

  const handleSearch = async (keywords: string, location: string) => {
    setLoadingJobs(true);
    try {
      await fetch("/api/linkedin", {
        headers: {
          "search-keywords": keywords,
          location: location,
        },
      }).then(async (response) => {
        const { linkedInJobs } = await response.json();
        setLinkedInData(linkedInJobs);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleSearchClick = () => {
    handleSearch(searchInput, locationInput);

    setSearchInput("");
    setLocationInput("");
  };

  return (
    <form className="w-full md:max-w-[80%] lg:max-w-[70%] xl:max-w-[60%] flex items-center gap-3 rounded-full shadow-md bg-[#eeeeee] dark:bg-white/10 p-3">
      {/*--------------- KEYWORDS INPUT ---------------*/}
      <Input
        value={searchInput}
        isClearable
        placeholder="Search for job listings..."
        onValueChange={(value) => setSearchInput(value)}
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
        onValueChange={(value) => setLocationInput(value)}
        className="w-4/12"
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
        className="text-base ml-auto rounded-full w-2/12 disabled:opacity-50 disabled:hover:opacity-50 disabled:cursor-not-allowed"
        disabled={!searchInput}
        onClick={handleSearchClick}
      >
        Search
      </CustomButton>
    </form>
  );
};

export default SearchInputsArea;
