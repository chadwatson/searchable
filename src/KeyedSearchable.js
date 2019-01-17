import { merge } from "ramda";

const SENTINAL = "@@__KEYED_SEARCHABLE__@@";

const mapObj = (f, obj) =>
  Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [key]: f(obj[key], key) }),
    {}
  );

export default class KeyedSearchable {
  static isKeyedSearchable(maybeKeyedSearchable) {
    return !!maybeKeyedSearchable[SENTINAL];
  }

  [SENTINAL] = true;

  constructor(obj) {
    this.$value = obj;
  }

  join() {
    return this.$value;
  }

  map(f) {
    return new KeyedSearchable(mapObj(f, this.$value));
  }

  merge(keyedSearchable) {
    return new KeyedSearchable(merge(this.$value, keyedSearchable.join()));
  }

  fold(f, seed) {
    return Object.keys(this.$value).reduce(
      (acc, key) => f(acc, this.$value[key], key),
      seed
    );
  }

  toString() {
    return `Searchable.Keyed(${JSON.stringify(this.$value)})`;
  }
}
