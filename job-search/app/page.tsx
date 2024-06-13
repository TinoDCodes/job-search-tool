"use client";

import { useState } from "react";
import { LinkedInJob } from "./api/linkedin/scraper";

const Home = () => {
  const [loadingJobs, setLoadingJobs] = useState<boolean>(false);
  const [linkedInData, setLinkedInData] = useState<LinkedInJob[] | null>(null);
  const [searchInput, setSearchInput] = useState<string>("");

  const handleSearch = async () => {
    setLoadingJobs(true);
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
    } finally {
      setLoadingJobs(false);
      setSearchInput("");
    }
  };

  return (
    <main className="h-full w-full flex items-start justify-center">
      {loadingJobs ? (
        <div className="w-full m-auto flex flex-col justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <section className="h-full w-full flex flex-col gap-4 pt-10 pb-2">
          <div className="w-full flex justify-center">
            <input
              type="text"
              placeholder="Search for jobs..."
              value={searchInput}
              className="h-12 w-3/5 rounded-l-full px-6 py-4 text-black"
              onChange={(value) => setSearchInput(value.target.value)}
            />
            <button
              type="button"
              className="bg-[var(--app-accent-color)] px-6 rounded-r-full disabled:opacity-65"
              disabled={!searchInput.trim()}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          <div className="flex flex-col gap-2 items-center overflow-y-scroll hide-scroll">
            {linkedInData?.map((job, index) => (
              <div
                key={job.id! || index}
                className="w-2/3 px-6 py-4 bg-[#00AB8B] rounded-md"
              >
                <h3>{job.title}</h3>
                <h4>{job.company}</h4>
                <p>{job.location}</p>
                <small>{job.dateListed}</small>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
