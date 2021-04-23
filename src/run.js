import config from "config";
import map from "lodash/map";

import {notify} from "./notifications";
import {search} from "./search";

export const run = async () => {
  const successful = await search(config.searches);

  console.log(`${successful.length} searches successful`);

  await Promise.all(map(successful, notify(config.notifications)));

  if (successful.length) {
    console.log("Notifications sent!");
  }
}
