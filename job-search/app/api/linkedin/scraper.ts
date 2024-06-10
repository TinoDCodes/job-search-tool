import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export type LinkedInJob = {
  id?: string;
  title: string;
  company: string;
  location: string;
  dateListed: string;
  link?: string;
};

export async function getScrapedLinkedInJobs(pageUrl: string) {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set screen size
  await page.setViewport({ width: 1920, height: 1080 });

  // Navigate the page to desired url
  await page.goto(pageUrl, {
    waitUntil: "domcontentloaded",
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // collect the page's html data
  const html = await page.content();

  const linkedInJobs = scrapeLinkedInJobCards(html);

  console.log(linkedInJobs);

  return linkedInJobs;
}

function scrapeLinkedInJobCards(html: string) {
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
    const dateListed = $(jobElement)
      .find(".job-search-card__listdate")
      .text()
      .trim();

    list.push({
      id: getJobIdNumber(id),
      title,
      company,
      location,
      dateListed,
      link,
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
