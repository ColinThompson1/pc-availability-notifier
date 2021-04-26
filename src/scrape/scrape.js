import cheerio from "cheerio";

import {backcountry} from "./backcountry";
import {campsite} from "./campsite";

const byVariant = {backcountry, campsite};

export const scrape = (html, variant) => {
  const $ = cheerio.load(html);

  const scraper = byVariant[variant];

  if (!scraper) {
    console.log(`No scraper found for ${variant}`);
  }

  return scraper($);
};
