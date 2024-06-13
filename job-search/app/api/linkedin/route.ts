import { NextResponse } from "next/server";
import { getScrapedLinkedInJobs } from "./scraper";

export async function GET(request: Request) {
  const searchKeywords = request.headers.get("search-keywords");
  const jobsFound = await getScrapedLinkedInJobs(searchKeywords!);

  return NextResponse.json({
    linkedInJobs: jobsFound,
  });
}
