import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({
    indeedJobs: ["Hello from indeed route!"],
  });
}
