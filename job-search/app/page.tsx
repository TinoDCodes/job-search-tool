"use client";

import { useState } from "react";
import { LinkedInJob } from "./api/linkedin/scraper";

const Home = () => {
  const [loadingJobs, setLoadingJobs] = useState<boolean>(false);
  const [linkedInData, setLinkedInData] = useState<LinkedInJob[] | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = async () => {
    try {
      const response = await fetch("/api/linkedin", {
        headers: {
          "search-keywords": searchInput,
        },
      });
      const { linkedInJobs } = await response.json();
      setLinkedInData(linkedInJobs);

      console.log(linkedInJobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main className="h-full w-full flex items-start justify-center">
      {loadingJobs ? (
        <div className=""></div>
      ) : (
        <>
          <div className="w-full m-auto flex justify-center">
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              className="h-12 w-3/5 rounded-l-full px-6 py-4 text-black"
              onChange={(value) => setSearchInput(value.target.value)}
            />
            <button
              type="button"
              className="bg-[var(--app-accent-color)] px-6 rounded-r-full"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default Home;
