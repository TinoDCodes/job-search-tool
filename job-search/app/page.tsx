"use client";

import { useState } from "react";
import { LinkedInJob } from "./api/linkedin/scraper";
import Hero from "@/components/Hero";
import Image from "next/image";
import SearchHistory from "@/components/SearchHistory";
import SearchInputsArea from "@/components/SearchInputsArea";

const Home = () => {
  const [loadingJobs, setLoadingJobs] = useState<boolean>(false);
  const [linkedInData, setLinkedInData] = useState<LinkedInJob[] | null>(null);

  const handleSearch = async (keywords: string) => {
    setLoadingJobs(true);
    try {
      const response = await fetch("/api/linkedin", {
        headers: {
          "search-keywords": keywords,
        },
      });
      const { linkedInJobs } = await response.json();
      setLinkedInData(linkedInJobs);

      console.log(linkedInJobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingJobs(false);
    }
  };

  return (
    <main className="h-full w-full px-10">
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

      <div className="relative flex">
        <Hero />

        <section className="w-4/5 h-16 absolute -bottom-8 left-1/2 transform -translate-x-1/2 rounded-xl bg-[#eee] shadow-xl px-4 py-2">
          <SearchInputsArea submitSearch={handleSearch} />
        </section>
      </div>
    </main>
  );
};

export default Home;
