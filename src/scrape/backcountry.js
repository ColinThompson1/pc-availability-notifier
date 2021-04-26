import addDays from "date-fns/addDays";
import intersection from "lodash/intersection";
import set from "lodash/set";

import {siteStatus} from "../site-status";

import {parseDates} from "./parse-dates";

export const backcountry = ($) => {
  const availability = {};

  const cal = $("#siteAvailabilityCalendar");
  const calRange = $("#availabilityCalendarDates").text();

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
