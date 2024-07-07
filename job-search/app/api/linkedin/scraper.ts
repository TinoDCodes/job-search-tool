import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export type LinkedInJob = {
  id?: string;
  title: string;
  company: string;
  location: string;
  dateListed: string;
  link?: string;
  imageSrc?: string;
};

// https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Python%20(Programming%20Language)&location=Las%20Vegas,%20Nevada,%20United%20States
const SEARCH_PAGE_BASE_URL =
  "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?";

/**
 * Builds a url for the LinkedIn search page api using the {@link SEARCH_PAGE_BASE_URL} and
 * user input values from the frontend.
 *
 * @param {string} searchKeywords - search keywords entered by the user for the desired job posts.
 * @returns {string} the LinkedIn search page url with the relevant query strings appended to it.
 */
function searchPageUrlBuilder(searchKeywords: string, location: string) {
  const keywords = encodeURIComponent(searchKeywords);
  const locationUriComponent = location.trim()
    ? `&location=${encodeURIComponent(location)}`
    : "";

  const pageUrl = `${SEARCH_PAGE_BASE_URL}keywords=${keywords}${locationUriComponent}`;
  return pageUrl;
}

/**
 * Scrapes job listings from LinkedIn based on the provided user search input values.
 *
 * @param {string} searchKeywords - The search keywords entered by the user for the desired job posts.
 * @param {string} [location] - the location the user wishes to find the particular jobs in.
 * @returns {Promise<LinkedInJob[]>} A promise that resolves to an array of job objects, each containing the
 * id, title, company, location, date listed, and link of a job listing.
 */
export async function getScrapedLinkedInJobs(
  searchKeywords: string,
  location: string
) {
  const scrapedJobsList: LinkedInJob[] = [];
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: 1920, height: 1080 });

  const searchUrl = searchPageUrlBuilder(searchKeywords, location);

  for (let i = 0; i < 10; i++) {
    try {
      let fullSearchPageUrl = `${searchUrl}&start=${i * 25}`;

      // Navigate the page to desired url
      await page.goto(fullSearchPageUrl, {
        waitUntil: "domcontentloaded",
      });
      await new Promise((resolve) => setTimeout(resolve, 500));

      // collect the page's html data
      const html = await page.content();

      const jobs = scrapeJobsFromSearchPage(html);

      scrapedJobsList.push(...jobs);
    } catch (error) {
      console.error(
        `Unexpected error while scraping LinkedIn Jobs on page ${i + 1}`,
        error
      );
    }
  }

  return scrapedJobsList;
}

/**
 * Scrapes job listings from the html of a LinkedIn search page.
 *
 * @param {string} html - The HTML content of the LinkedIn search page.
 * @returns {LinkedInJob[]} An array of job objects, each containing the id, title, company,
 * location, date listed, and link of a job listing.
 */
function scrapeJobsFromSearchPage(html: string) {
  const $ = cheerio.load(html);

  const jobs = $("li");
  const list: LinkedInJob[] = [];

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

    list.push({
      id: getJobIdNumber(id),
      title,
      company,
      location,
      dateListed,
      link,
      imageSrc,
    });
  });

  return list;
}

/**
 * Extracts the id number from the string value we get from the job postings html, because
 * it comes with extra text that is not needed.
 *
 * @param id - job id string from html
 * @returns {string | undefined}
 */
const getJobIdNumber = (id?: string) => {
  if (id) {
    return id.split(":").at(-1);
  }
};
