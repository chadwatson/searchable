import Maybe from "data.maybe";
import { is, prop } from "ramda";
import { Seq } from "immutable";
import KeyedSearchable from "./KeyedSearchable";
import standardQuery from "./standardQuery";
import scoreItem from "./scoreItem";

const SENTINAL = "@@__INDEXED_SEARCHABLE__@@";

export default class IndexedSearchable {
  static of(...args) {
    return new IndexedSearchable(args);
  }

  static isIndexedSearchable(maybeIndexedSearchable) {
    return !!maybeIndexedSearchable[SENTINAL];
  }

  static fromKeyed(keyedSearchable) {
    if (!KeyedSearchable.isKeyedSearchable(keyedSearchable)) {
      throw new TypeError("A Searchable.Keyed must be provided.");
    }

    return new IndexedSearchable(keyedSearchable.join().valueSeq());
  }

  [SENTINAL] = true;

  constructor(list) {
    this.$value = Seq(list).map(value =>
      typeof value.score === "number" ? value : { value, score: 1 }
    );
  }

  get size() {
    return this.$value.size;
  }

  join() {
    return this.$value;
  }

  concat(searchable) {
    return new IndexedSearchable(this.$value.concat(searchable.join()));
  }

  fold(f, seed) {
    return this.$value.reduce((acc, { value, score }) => f(acc, value), seed);
  }

  first() {
    return Maybe.fromNullable(this.$value.first())
      .map(prop("value"))
      .getOrElse(undefined);
  }

  last() {
    return Maybe.fromNullable(this.$value.last())
      .map(prop("value"))
      .getOrElse(undefined);
  }

  take(n) {
    return new IndexedSearchable(this.$value.take(n));
  }

  takeLast(n) {
    return new IndexedSearchable(this.$value.takeLast(n));
  }

  slice(startIndex, endIndex) {
    return new IndexedSearchable(this.$value.slice(startIndex, endIndex));
  }

  get(index) {
    return Maybe.fromNullable(this.$value.get(index))
      .map(prop("value"))
      .getOrElse(undefined);
  }

  search(stringOrQuery) {
    const query = is(String, stringOrQuery)
      ? standardQuery(stringOrQuery)
      : stringOrQuery;
    const getScore = scoreItem(query);
    return new IndexedSearchable(
      this.$value
        .map(({ value }) => ({
          value,
          score: getScore(value)
        }))
        .filter(({ score }) => score >= query.minScore)
    );
  }

  toString() {
    return `Searchable.Indexed(${this.$value.map(prop("value")).toArray()})`;
  }
}
