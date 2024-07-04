"use client";

import { useState } from "react";
import { LinkedInJob } from "./api/linkedin/scraper";
import Hero from "@/components/Hero";
import Image from "next/image";
import SearchHistory from "@/components/SearchHistory";
import SearchInputsArea from "@/components/SearchInputsArea";
import DisplayJobListings from "@/components/DisplayJobListings";

const Home = () => {
  const [loadingJobs, setLoadingJobs] = useState<boolean>(false);
  const [linkedInData, setLinkedInData] = useState<LinkedInJob[] | null>(null);

  const handleSearch = async (keywords: string) => {
    setLoadingJobs(true);
    try {
      await fetch("/api/linkedin", {
        headers: {
          "search-keywords": keywords,
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

  return (
    <main className="h-full w-full flex flex-col px-10 pb-16">
      <header className="w-full h-fit flex items-center justify-between py-6 px-10">
        <Image
          src="/logo.png"
          alt="logo"
          height="0"
          width="0"
          sizes="100vw"
          className="h-8 w-40 invert"
        />

        <SearchHistory />
      </header>

      <section className="relative flex mb-16 z-50">
        <Hero />

        <div className="w-4/5 h-16 absolute -bottom-8 left-1/2 transform -translate-x-1/2 rounded-xl bg-[#eee] shadow-xl px-4 py-2">
          <SearchInputsArea submitSearch={handleSearch} />
        </div>
      </section>

      <section className="h-[1fr] w-full">
        {loadingJobs ? (
          <div className="h-full w-full flex flex-col items-center justify-center pt-28 ease-in">
            <div className="loader mb-4"></div>
            <h3 className="text-lg font-bold text-[var(--color-text-7)] opacity-50">
              Finding Job Listings...
            </h3>
          </div>
        ) : (
          <DisplayJobListings jobListings={linkedInData} />
        )}
      </section>
    </main>
  );
};

export default Home;
