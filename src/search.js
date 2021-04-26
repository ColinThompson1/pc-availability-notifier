import config from "config";

import {createSession} from "./create-session";
import {scrape} from "./scrape";
import {hasAvailability} from "./has-availability";

export const search = async (searches) => {
  const successful = [];

  for (const search of searches) {
    const {name, itinerary, reservationType, park} = search;

    console.log(`Searching ${name}...`);

    const session = await createSession(config);

    await session.setReservationInfo({
      resType: reservationType,
      arrDate: itinerary[0].day,
      nights: itinerary.length,
    });

    const response = await session.getAvailability(park);
    const availability = scrape(response.body, reservationType.toLowerCase());

    if (hasAvailability(availability, itinerary)) {
      console.log("Search successful");
      successful.push(search);
    } else {
      console.log("Search unsuccessful");
    }
  }

  return successful;
};
