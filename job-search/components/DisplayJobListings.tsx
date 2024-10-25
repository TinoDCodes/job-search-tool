"use client";

import { getScrapedLinkedInJobs } from "@/server/actions/linkedInScraper";
import { Pagination, Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import EmptyJobsScreen from "./EmptyJobsScreen";
import { JobCard } from "./JobCard";

interface Props {
  searchParams: {
    keywords: string;
    location: string;
  };
}

const DisplayJobListings = ({ searchParams }: Props) => {
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs", searchParams.keywords],
    queryFn: async () => {
      const jobs = await getScrapedLinkedInJobs(
        searchParams.keywords,
        searchParams.location
      );
      return jobs;
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
  });

  const displayedJobsLength =
    jobs && jobs.length ? Math.ceil(jobs.length * 0.75) : 0;

  // const numberOfPages: number = jobListings
  //   ? Math.ceil(jobListings?.length / 20)
  //   : 0;

  // useEffect(() => {
  //   if (jobListings && jobListings.length > 0) {
  //     setDisplayedJobs(jobListings.slice(0, 20));
  //   }
  // }, [jobListings]);

  // const handlePageChange = (page: number) => {
  //   if (!jobListings) return;

  //   const startIndex = (page - 1) * 20;
  //   let endIndex = startIndex + 20;

  //   if (endIndex >= jobListings?.length) endIndex = jobListings?.length - 1;

  //   setDisplayedJobs(jobListings?.slice(startIndex, endIndex));
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  // if (!jobListings || jobListings.length === 0) {
  //   return <EmptyJobsScreen />;
  // }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner color="secondary" size="lg" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!jobs || jobs.length === 0) {
    return <EmptyJobsScreen />;
  }

  return (
    <main className="h-full w-full flex flex-col gap-6">
      {/*--------------- JOB LISTING HEADER ---------------*/}
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm lg:text-base text-zinc-400 max-w-[65%] truncate">
          results for <span className="font-bold">{searchParams.keywords}</span>
        </p>
        <small className="font-medium text-sm lg:text-base text-zinc-400">
          {displayedJobsLength}+ jobs
        </small>
      </div>

      {/*--------------- JOB LISTING CARDS ---------------*/}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6">
        {jobs.map((job, index) => (
          <JobCard key={job.id || index} job={job} />
        ))}
      </section>

      {/*--------------- PAGINATION ---------------*/}
      {/* <Pagination
        showShadow
        color="secondary"
        total={numberOfPages}
        initialPage={1}
        className="mx-auto font-medium"
        onChange={handlePageChange}
      /> */}
    </main>
  );
};

export default DisplayJobListings;
