"use client";

import { LinkedInJob } from "@/app/api/linkedin/scraper";
import EmptyJobsScreen from "@/components/EmptyJobsScreen";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider, Link, Pagination, ScrollShadow } from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  jobListings: LinkedInJob[] | null;
}

const DisplayJobListings = ({ jobListings }: Props) => {
  const [displayedJobs, setDisplayedJobs] = useState<LinkedInJob[] | null>(
    null
  );

  const numberOfPages: number = jobListings
    ? Math.ceil(jobListings?.length / 20)
    : 0;

  useEffect(() => {
    if (jobListings && jobListings.length > 0) {
      setDisplayedJobs(jobListings.slice(0, 20));
    }
  }, [jobListings]);

  const handlePageChange = (page: number) => {
    if (!jobListings) return;

    const startIndex = (page - 1) * 20;
    let endIndex = startIndex + 20;

    if (endIndex >= jobListings?.length) endIndex = jobListings?.length - 1;

    setDisplayedJobs(jobListings?.slice(startIndex, endIndex));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!jobListings || jobListings.length === 0) {
    return <EmptyJobsScreen />;
  }

  return (
    <main className="h-full w-full flex flex-col gap-6">
      <h5 className="text-center font-bold text-sm opacity-40">
        {jobListings.length} listings found.
      </h5>
      <section className="w-full grid grid-cols-3 gap-8">
        {displayedJobs?.map((job, index) => (
          <Card key={job.id || index} className="w-full px-6 py-2 bg-[#eeee]">
            <CardBody className="flex flex-row items-center">
              {/*--------------- JOB LISTING DETAILS ---------------*/}
              <div className=" flex flex-col">
                <h4 className="text-lg font-semibold text-[var(--color-text-1)]">
                  {job.title}
                </h4>
                <h5 className="font-medium text-[var(--color-text-7)]">
                  {job.company}
                </h5>
                <div className="flex gap-2 items-center">
                  <p>{job.location}</p>
                  <Image
                    src="/location-pin.svg"
                    alt="location"
                    height="0"
                    width="0"
                    sizes="100vw"
                    className="h-3 w-3"
                  />
                </div>
              </div>

              {/*--------------- JOB COMPANY IMAGE ---------------*/}
              {job.imageSrc && (
                <Image
                  src={job.imageSrc}
                  alt="location"
                  height="0"
                  width="0"
                  sizes="100vw"
                  className="h-[5rem] w-[5rem] ml-auto"
                />
              )}
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-between">
              <p className="font-medium text-sm text-[var(--color-text-6)] opacity-75">
                {job.dateListed}
              </p>

              <Link
                isBlock
                showAnchorIcon
                color="secondary"
                size="sm"
                target="_blank"
                href={job.link}
                className="font-medium"
              >
                View listing
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>

      {/*--------------- PAGINATION ---------------*/}
      <Pagination
        showShadow
        color="secondary"
        total={numberOfPages}
        initialPage={1}
        className="mx-auto font-medium"
        onChange={handlePageChange}
      />
    </main>
  );
};

export default DisplayJobListings;
