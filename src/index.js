import {
  compose,
  map,
  filter,
  reduce,
  flip,
  always,
  call,
  defaultTo,
  addIndex
} from "ramda";

const flippedMap = flip(addIndex(map));
const flippedFilter = flip(addIndex(filter));
const flippedCall = flip(call);

const Searchable = x => ({
  map: compose(Searchable, flippedMap(x)),
  filter: compose(Searchable, flippedFilter(x)),
  results: always(x),
  inspect: always(`Searchable(${JSON.stringify(x)})`)
});

Searchable.of = (...args) => Searchable([...args]);
Searchable.from = Searchable;

export default Searchable;
