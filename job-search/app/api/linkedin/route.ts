import { NextResponse } from "next/server";
import { getScrapedLinkedInJobs } from "./scraper";

export async function GET(request: Request) {
  const searchKeywords = request.headers.get("search-keywords");
  const location = request.headers.get("location");

  const jobsFound = await getScrapedLinkedInJobs(searchKeywords!, location!);

  return NextResponse.json({
    linkedInJobs: jobsFound,
  });
}
