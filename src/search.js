import config from "config";
import filter from "lodash/filter";

import {createSession} from "./create-session";
import {scrape} from "./scrape";
import {hasAvailability} from "./has-availability";

export const search = async (searches) => {
  const successful = [];

  for (const search of searches) {
    const {itinerary, reservationType, park} = search;

    const session = await createSession(config);

    await session.setReservationInfo({
      resType: reservationType,
      arrDate: itinerary[0].day,
      nights: itinerary.length,
    });

    const response = await session.getAvailability(park);
    const availability = scrape(response.body);

    if (hasAvailability(availability, itinerary)) {
      successful.push(search);
    } 
  }

  return successful;
};
