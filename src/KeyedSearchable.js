import { Seq } from "immutable";
import { prop, isNil } from "ramda";

const SENTINAL = "@@__KEYED_SEARCHABLE__@@";

export default class KeyedSearchable {
  static isKeyedSearchable(maybeKeyedSearchable) {
    return !!maybeKeyedSearchable[SENTINAL];
  }

  [SENTINAL] = true;

  constructor(collection) {
    this.$value = Seq(collection)
      .filterNot(isNil)
      .map(item => ({
        value: item.value || item,
        score: item.score || 1
      }));
  }

  join() {
    return this.$value;
  }

  merge(keyedSearchable) {
    return new KeyedSearchable(
      keyedSearchable
        .join()
        .reduce((acc, item, key) => acc.set(key, item), this.$value.toMap())
        .toSeq()
    );
  }

  fold(f, seed) {
    return this.$value.reduce(
      (acc, { value, score }, key) => f(acc, value, key),
      seed
    );
  }

  toString() {
    return `Searchable.Keyed(${JSON.stringify(
      this.$value.map(prop("value")).toObject()
    )})`;
  }
}
