import {
  compose,
  map,
  filter,
  reduce,
  flip,
  always,
  call,
  defaultTo,
  addIndex,
  prop
} from "ramda";

export const SEARCHABLE_SENTINAL = "@@__SEARCHABLE__@@";

const flippedMap = flip(addIndex(map));
const flippedFilter = flip(addIndex(filter));
const flippedCall = flip(call);

export const isSearchable = compose(Boolean, prop(SEARCHABLE_SENTINAL));

const Searchable = x => ({
  map: compose(Searchable, flippedMap(x)),
  filter: compose(Searchable, flippedFilter(x)),
  results: always(x),
  inspect: always(`Searchable(${JSON.stringify(x)})`),
  [SEARCHABLE_SENTINAL]: true
});

Searchable.of = (...args) => Searchable([...args]);
Searchable.from = Searchable;

export default Searchable;
