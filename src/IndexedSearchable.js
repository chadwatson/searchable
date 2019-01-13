import KeyedSearchable from "./KeyedSearchable";

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

    return new IndexedSearchable(Object.values(keyedSearchable.join()));
  }

  [SENTINAL] = true;

  constructor(list) {
    this.$value = list;
  }

  join() {
    return this.$value;
  }

  concat(searchable) {
    return new IndexedSearchable(this.$value.concat(searchable.join()));
  }

  map(f) {
    return new IndexedSearchable(this.$value.map(f));
  }

  fold(f, seed) {
    return this.$value.reduce(f, seed);
  }

  first() {
    return this.$value[0];
  }

  last() {
    return this.$value[this.$value.length - 1];
  }

  take(n) {
    return new IndexedSearchable(this.$value.slice(0, n));
  }

  takeLast(n) {
    return new IndexedSearchable(
      this.$value.slice(Math.max(0, this.$value.length - n))
    );
  }

  slice(startIndex, endIndex) {
    return new IndexedSearchable(this.$value.slice(startIndex, endIndex));
  }

  inspect() {
    return `Searchable.Indexed(${this.$value})`;
  }

  toString() {
    return `Searchable.Indexed(${this.$value})`;
  }
}
