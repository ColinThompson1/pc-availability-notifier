import config from "config";

import {createSession} from "./create-session";
import {scrape} from "./scrape";
import {hasAvailability} from "./has-availability";

export const search = async (searches) => {
  const search = {
    reservationType: "Backcountry", // Campsite, Backcountry
    park: "Banff,KootenayandYohoBackcountry", // Banff,KootenayandYohoBackcountry, Banff, PacificRim
    pads: 1,
    itinerary: [
      {
        day: "2021-07-04",
        campground: "Big Springs - Br9",
      },
    ],
  };

  searches = [search];

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
      console.log("Available!");
    } else {
      console.log("Unavailable :(");
    }
  }
};
