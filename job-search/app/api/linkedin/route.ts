import { NextResponse } from "next/server";
import { getScrapedLinkedInJobs } from "./scraper";

const testUrl =
  "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Python%20(Programming%20Language)&location=Las%20Vegas,%20Nevada,%20United%20States";

export async function GET(request: Request) {
  const jobsFound = await getScrapedLinkedInJobs(testUrl);

  return NextResponse.json({
    linkedInJobs: jobsFound,
  });
}
