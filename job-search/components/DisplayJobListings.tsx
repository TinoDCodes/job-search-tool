import { LinkedInJob } from "@/app/api/linkedin/scraper";
import EmptyJobsScreen from "@/components/EmptyJobsScreen";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider, Link, ScrollShadow } from "@nextui-org/react";
import Image from "next/image";

interface Props {
  jobListings: LinkedInJob[] | null;
}

const DisplayJobListings = ({ jobListings }: Props) => {
  if (!jobListings) {
    return <EmptyJobsScreen />;
  }

  return (
    <main className="h-full w-full grid grid-cols-3 gap-8">
      {jobListings.map((job) => (
        <Card key={job.id} className="w-full px-6 py-2 bg-[#eeee]">
          <CardBody className="flex flex-col">
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
    </main>
  );
};

export default DisplayJobListings;
