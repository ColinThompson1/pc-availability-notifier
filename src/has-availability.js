import every from "lodash/every";
import get from "lodash/get";
import parseISO from "date-fns/parseISO";

import {siteStatus} from "./site-status";

export const hasAvailability = (availability, itinerary) => {
  return every(itinerary, ({day, campground}) => {
    const timestamp = parseISO(day).valueOf();

    return (
      get(availability, `${campground}.${timestamp}`) === siteStatus.AVAILABLE
    );
  });
};
