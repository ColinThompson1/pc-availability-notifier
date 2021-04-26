import addDays from "date-fns/addDays";
import cheerio from "cheerio";
import intersection from "lodash/intersection";
import isEmpty from "lodash/isEmpty";
import parse from "date-fns/fp/parse";
import set from "lodash/set";

import {siteStatus} from "./site-status";

const parseDates = (str) => {
  return str
    .match(/\((.*)\)/)[1]
    .split("-")
    .map(parse(new Date(), "MMM d, yyyy"));
};

export const scrape = (html) => {
  const availability = {};

  const $ = cheerio.load(html);
  const cal = $("#siteAvailabilityCalendar");

  let calRange = $("#availabilityCalendarDates").text();

  // Inconsistent across pages
  if (isEmpty(calRange)) {
    calRange = $("#siteAvailabilityContainer > h2").text();
  }

  const [from] = parseDates(calRange);

  const rows = cal.find("tbody > tr");
  rows.each((i, row) => {
    const name = $(row).find("th:nth-child(2)").text();

    $(row)
      .find("td")
      .each((j, col) => {
        const classNames = $(col).attr("class").split(" ");
        const status = intersection(classNames, Object.values(siteStatus))[0];

        set(
          availability,
          `${name}.${addDays(from, j).valueOf().toString()}`,
          status
        );
      });
  });

  return availability;
};
