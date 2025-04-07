import { Job } from "@/utils/types";
import { LinkIcon, MapPinIcon } from "@heroicons/react/16/solid";
import { Divider } from "@heroui/react";
import Image from "next/image";

interface Props {
  job: Job;
}

export const JobCard = ({ job }: Props) => {
  return (
    <div className="flex flex-col w-full lg:h-[8rem] rounded-medium bg-zinc-100/80 shadow-md dark:bg-white/5 py-2 px-3">
      <section className="flex items-center gap-2 2xl:gap-4">
        <Image
          src={job.imageSrc}
          alt={job.title}
          width={80}
          height={80}
          className="h-14 w-14 lg:h-20 lg:w-20 rounded-md"
        />

        <div className="flex flex-col">
          <p className="text-sm font-medium text-black dark:text-zinc-100 line-clamp-2">
            {job.title}
          </p>
          <p className="text-xs font-medium text-black dark:text-zinc-100 line-clamp-1">
            {job.company}
          </p>
        </div>

        <a href={job.link} target="_blank" rel="noreferrer" className="ml-auto">
          <LinkIcon
            strokeWidth={2}
            className="h-4 w-4 lg:h-5 lg:w-5 text-violet-500 group-hover:text-violet-400 dark:group-hover:text-violet-400"
          />
        </a>
      </section>

      <Divider className="w-full my-2" />

      <section className="flex items-center justify-between">
        <p className="flex items-center gap-1 text-xs font-medium text-zinc-700 dark:text-zinc-100">
          <MapPinIcon className="h-3 w-3" /> {job.location}
        </p>
        <p className="text-xs font-medium text-zinc-700 dark:text-zinc-100">
          {job.dateListed}
        </p>
      </section>
    </div>
  );
};
