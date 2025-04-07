import { NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import * as cheerio from "cheerio";

// Determine if we're in production (Vercel)
const isProduction = process.env.NODE_ENV === "production";

// Only configure Chromium for production
if (isProduction) {
  chromium.setGraphicsMode = false;
}

async function getBrowser() {
  if (isProduction) {
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  } else {
    // Local development configuration
    return puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: getChromePath(),
      headless: true,
    });
  }
}

// Helper function to get Chrome path for local development
function getChromePath() {
  if (process.platform === "win32") {
    return "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  } else if (process.platform === "darwin") {
    return "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  } else {
    return "/usr/bin/google-chrome";
  }
}

const SEARCH_PAGE_BASE_URL =
  "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?";

function searchPageUrlBuilder(searchKeywords: string, location: string) {
  const keywords = encodeURIComponent(searchKeywords);
  const locationUriComponent =
    location && location.trim()
      ? `&location=${encodeURIComponent(location)}`
      : "";
  return `${SEARCH_PAGE_BASE_URL}keywords=${keywords}${locationUriComponent}`;
}

function scrapeJobsFromSearchPage(html: string) {
  const $ = cheerio.load(html);
  const jobs = $("li");
  const list: any[] = [];

  jobs.each((index, jobElement) => {
    const id = $(jobElement).find("div.base-card").attr("data-entity-urn");
    const link = $(jobElement).find("a.base-card__full-link").attr("href");
    const title = $(jobElement).find(".base-search-card__title").text().trim();
    const company = $(jobElement)
      .find(".base-search-card__subtitle")
      .text()
      .trim();
    const location = $(jobElement)
      .find(".job-search-card__location")
      .text()
      .trim();
    const dateListed =
      $(jobElement).find(".job-search-card__listdate").text().trim() ||
      $(jobElement).find(".job-search-card__listdate--new").text().trim();
    const imageSrc = $(jobElement).find("img").attr("data-delayed-url");

    if (id && title && company && location && dateListed && link) {
      list.push({
        id: id.split(":").at(-1),
        title,
        company,
        location,
        dateListed,
        link,
        imageSrc: imageSrc || "/linkedin.svg",
        platform: "linkedin",
      });
    }
  });

  return list;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keywords = searchParams.get("keywords") || "";
  const location = searchParams.get("location") || "";

  if (!keywords) {
    return NextResponse.json(
      { error: "Keywords parameter is required" },
      { status: 400 }
    );
  }

  try {
    const browser = await getBrowser(); // Use the environment-specific launcher

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1920, height: 1080 });
      const searchUrl = searchPageUrlBuilder(keywords, location);
      const scrapedJobsList: any[] = [];

      // Limit to 2 pages for demo purposes (50 jobs)
      for (let i = 0; i < 2; i++) {
        try {
          const fullSearchPageUrl = `${searchUrl}&start=${i * 25}`;
          await page.goto(fullSearchPageUrl, {
            waitUntil: "domcontentloaded",
            timeout: 15000,
          });
          await new Promise((resolve) => setTimeout(resolve, 500));
          const html = await page.content();
          const jobs = scrapeJobsFromSearchPage(html);
          scrapedJobsList.push(...jobs);
        } catch (error) {
          console.error(`Error scraping page ${i + 1}:`, error);
        }
      }

      return NextResponse.json(scrapedJobsList);
    } finally {
      await browser.close();
    }
  } catch (error) {
    console.error("Error in LinkedIn scraping:", error);
    return NextResponse.json(
      { error: "Failed to scrape LinkedIn jobs" },
      { status: 500 }
    );
  }
}
