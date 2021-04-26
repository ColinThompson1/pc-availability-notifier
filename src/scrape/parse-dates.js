import parse from "date-fns/fp/parse";

export const parseDates = (str) => {
  return str
    .match(/\((.*)\)/)[1]
    .split("-")
    .map(parse(new Date(), "MMM d, yyyy"));
};
