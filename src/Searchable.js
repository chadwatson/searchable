import {
  compose,
  map,
  filter,
  reduce,
  flip,
  always,
  defaultTo,
  addIndex
} from "ramda";
import { SEARCHABLE_SENTINAL } from "./constants";

const flippedMap = flip(addIndex(map));
const flippedFilter = flip(addIndex(filter));

const Searchable = x => ({
  map: compose(Searchable, flippedMap(x)),
  filter: compose(Searchable, flippedFilter(x)),
  fold: f => f(x),
  results: always(x),
  inspect: always(`Searchable(${JSON.stringify(x)})`),
  [SEARCHABLE_SENTINAL]: true
});

Searchable.of = (...args) => Searchable([...args]);
Searchable.from = Searchable;

export default Searchable;
