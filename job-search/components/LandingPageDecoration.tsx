import { Job } from "@/utils/types";
import { MapPinIcon } from "@heroicons/react/16/solid";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Divider } from "@heroui/react";
import Image from "next/image";

const dummyJobs: Job[] = [
  {
    id: "492384",
    title: "Agile Coach",
    company: "Nordstrom Inc.",
    location: "Toronto, Canada",
    dateListed: "2 days ago",
    link: "https://www.linkedin.com/jobs/job-id-123456789",
    imageSrc: "/microsoft.svg",
    platform: "linkedin",
  },
  {
    id: "10892384",
    title: "Software Engineer",
    company: "Google",
    location: "London, UK",
    dateListed: "2 weeks ago",
    link: "https://www.linkedin.com/jobs/job-id-123456789",
    imageSrc: "/linkedin.svg",
    platform: "indeed",
  },
  {
    id: "123456789",
    title: "Junior Frontend Developer",
    company: "Amazon Web Services",
    location: "San Francisco, CA",
    dateListed: "17 hours ago",
    link: "https://www.linkedin.com/jobs/job-id-123456789",
    imageSrc: "/amazon.svg",
    platform: "toptal",
  },
];

export const LandingPageDecoration = () => {
  return (
    <div className="w-full mt-14 lg:mt-20 flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-5 lg:gap-8">
      {dummyJobs.map((job) => (
        <div
          key={job.id}
          className="flex flex-col w-full md:w-[20rem] lg:w-[24rem]  lg:h-[8rem] bg-black/10 dark:bg-white/20 rounded-medium py-2 px-3 opacity-50"
        >
          <section className="flex items-center gap-2">
            <Image
              src={job.imageSrc!}
              alt={job.title}
              width={80}
              height={80}
              className="h-14 w-14 lg:h-20 lg:w-20"
            />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-black dark:text-zinc-100">
                {job.title}
              </p>
              <p className="text-xs font-medium text-black dark:text-zinc-100">
                {job.company}
              </p>
            </div>
            <LinkIcon className="h-4 w-4 ml-auto" />
          </section>

          <Divider className="w-full mt-1 mb-2" />

          <section className="flex items-center justify-between">
            <p className="flex items-center gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-100">
              <MapPinIcon className="h-3 w-3" /> {job.location}
            </p>
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-100">
              {job.dateListed}
            </p>
          </section>
        </div>
      ))}
    </div>
  );
};
