import { curry, converge, divide, sum, length } from "ramda";

const average = converge(divide, [sum, length]);

const scoreString = curry(({ searchTerm, fuzziness }, string) =>
  string.split(" ").some(equals(searchTerm)) ? 1 : 0
);

const scoreItem = curry((query, item) =>
  typeof item === "string"
    ? scoreString(query, item)
    : typeof item === "number"
    ? scoreString(query, item.toString())
    : average(item.map(scoreItem(query)))
);

export default scoreItem;
