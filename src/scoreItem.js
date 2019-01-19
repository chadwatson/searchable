import { curry, converge, divide, sum, length, contains, toLower } from "ramda";
import { Seq } from "immutable";

const average = converge(divide, [sum, length]);

const scoreString = curry(({ searchTerm, fuzziness }, string) =>
  Seq(string.split(" "))
    .map(toLower)
    .some(contains(searchTerm))
    ? 1
    : 0
);

const scoreItem = curry((query, item) =>
  typeof item === "string"
    ? scoreString(query, item)
    : typeof item === "number"
    ? scoreString(query, item.toString())
    : Seq(item)
        .map(scoreItem(query))
        .max()
);

export default scoreItem;
