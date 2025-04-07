"use client";

import { getScrapedLinkedInJobs } from "@/server/actions/linkedInScraper";
import { Pagination, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import EmptyJobsScreen from "./EmptyJobsScreen";
import { JobCard } from "./JobCard";
import { useMemo, useState } from "react";

interface Props {
  searchParams: {
    keywords: string;
    location: string;
  };
}

const JOBS_PER_PAGE = 16;

const DisplayJobListings = ({ searchParams }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch jobs data based on search parameters
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs", searchParams.keywords, searchParams.location],
    queryFn: async () => {
      const jobs = await getScrapedLinkedInJobs(
        searchParams.keywords,
        searchParams.location
      );
      return jobs;
    },
    staleTime: 15 * 60 * 1000, // Cache data for 15 minutes
  });

  /**
   * Memoized list of jobs for the current page to improve performance.
   */
  const paginatedJobs = useMemo(() => {
    if (!jobs) return [];
    const start = (currentPage - 1) * JOBS_PER_PAGE;
    const end = start + JOBS_PER_PAGE;
    return jobs.slice(start, end);
  }, [jobs, currentPage]);

  const totalJobs = jobs ? jobs.length : 0;
  const numberOfPages = Math.ceil(totalJobs / JOBS_PER_PAGE);
  const displayedJobsLength =
    totalJobs <= JOBS_PER_PAGE
      ? `${totalJobs}`
      : `${Math.floor(totalJobs / JOBS_PER_PAGE) * JOBS_PER_PAGE}+`;

  /**
   * Handles page change for pagination.
   * Scrolls to the top smoothly when the page is changed.
   *
   * @param {number} page - The page number selected in the pagination
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /*----- Show loading spinner while fetching data -----*/
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  /*----- Display error message if the data fetch fails -----*/
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  /*----- Display empty jobs screen if there are no jobs -----*/
  if (!jobs || jobs.length === 0) {
    return <EmptyJobsScreen />;
  }

  return (
    <main className="min-h-[70vh] w-full flex flex-col gap-6">
      {/*--------------- JOB LISTING HEADER ---------------*/}
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm lg:text-base text-zinc-400 max-w-[65%] truncate">
          results for <span className="font-bold">{searchParams.keywords}</span>
        </p>
        <small className="font-medium text-sm lg:text-base text-zinc-400">
          {displayedJobsLength} jobs
        </small>
      </div>

      {/*--------------- JOB LISTING CARDS ---------------*/}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
        {paginatedJobs.map((job, index) => (
          <JobCard key={job.id || index} job={job} />
        ))}
      </section>

      {/*--------------- PAGINATION ---------------*/}
      <Pagination
        showShadow
        size="md"
        variant="bordered"
        total={numberOfPages}
        initialPage={1}
        className="mx-auto font-medium mt-auto"
        classNames={{
          item: "rounded-full",
          cursor: "bg-teal-400/80 rounded-full",
        }}
        onChange={handlePageChange}
      />
    </main>
  );
};

export default DisplayJobListings;
