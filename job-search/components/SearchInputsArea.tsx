"use client";

import { LinkedInJob } from "@/app/api/linkedin/scraper";
import { Input, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

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
    <div className="w-full h-full flex gap-3 items-center">
      {/*--------------- KEYWORDS INPUT ---------------*/}
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

      {/*--------------- LOCATION INPUT ---------------*/}
      <Input
        value={locationInput}
        isClearable
        radius="sm"
        placeholder="Location..."
        onValueChange={(value) => setLocationInput(value)}
        className="w-auto"
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
            src="/location-pin-black.svg"
            alt="location"
            height="0"
            width="0"
            sizes="100vw"
            className="h-4 w-4 opacity-50"
          />
        }
      />

      {/*--------------- SEARCH BUTTON ---------------*/}
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
